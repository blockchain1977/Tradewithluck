package com.toshi.manager;

/*
 * 	Copyright (c) 2017. Toshi Inc
 *
 * 	This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import android.widget.Toast;

import com.tradewithluck.R;
import com.toshi.crypto.HDWallet;
import com.toshi.util.LogUtil;
import com.tradewithluck.MainApplication;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import rx.Completable;
import rx.Single;
import rx.android.schedulers.AndroidSchedulers;
import rx.schedulers.Schedulers;
import rx.subjects.BehaviorSubject;

public class ToshiManager {

    public static final long CACHE_TIMEOUT = 1000 * 60 * 5;

    private final BehaviorSubject<HDWallet> walletSubject = BehaviorSubject.create();

    private BalanceManager balanceManager;
    private HDWallet wallet;
    private TransactionManager transactionManager;
    private ExecutorService singleExecutor;
    private boolean areManagersInitialised = false;

    public ToshiManager() {
        this.singleExecutor = Executors.newSingleThreadExecutor();
        this.balanceManager = new BalanceManager();
        this.transactionManager = new TransactionManager();
        this.walletSubject.onNext(null);

        tryInit();
    }

    // Ignores any data that may be stored on disk and always creates a new wallet.
    public Completable initNewWallet() {
        if (this.wallet != null && this.areManagersInitialised) {
            return Completable.complete();
        }

        return new HDWallet()
                .createWallet()
                .doOnSuccess(this::setWallet)
                .flatMapCompletable(__ -> initManagers())
                .subscribeOn(Schedulers.from(this.singleExecutor));
    }

    public Completable init(final HDWallet wallet) {
        this.setWallet(wallet);
        return initManagers()
                .subscribeOn(Schedulers.from(this.singleExecutor));
    }

    public Completable tryInit() {
        if (this.wallet != null && this.areManagersInitialised) {
            return Completable.complete();
        }
        return new HDWallet()
                .getExistingWallet()
                .doOnSuccess(this::setWallet)
                .flatMapCompletable(__ -> initManagers())
                .subscribeOn(Schedulers.from(this.singleExecutor));
    }

    private void setWallet(final HDWallet wallet) {
        this.wallet = wallet;
        this.walletSubject.onNext(wallet);
    }

    private Completable initManagers() {
        if (this.areManagersInitialised) return Completable.complete();
        return Completable.fromAction(() -> {
            this.transactionManager.init(this.wallet);
        })
                .onErrorComplete()
                .observeOn(AndroidSchedulers.mainThread())
                .doOnError(this::handleInitManagersError)
                .doOnCompleted(() -> this.areManagersInitialised = true);
    }

    private void handleInitManagersError(final Throwable throwable) {
        LogUtil.exception(getClass(), "Error while initiating managers " + throwable);
        Toast.makeText(
                MainApplication.get(),
                R.string.init_manager_error,
                Toast.LENGTH_SHORT
        ).show();
    }

    public final TransactionManager getTransactionManager() {
        return this.transactionManager;
    }

    public final BalanceManager getBalanceManager() {
        return this.balanceManager;
    }

    public Single<HDWallet> getWallet() {
        return
                this.walletSubject
                        .filter(wallet -> wallet != null)
                        .doOnError(t -> LogUtil.exception(getClass(), "Wallet is null", t))
                        .onErrorReturn(__ -> null)
                        .first()
                        .toSingle();
    }

}
