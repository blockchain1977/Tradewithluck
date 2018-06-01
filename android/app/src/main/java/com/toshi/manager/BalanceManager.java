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

package com.toshi.manager;


import android.content.Context;
import android.content.SharedPreferences;

import com.toshi.crypto.HDWallet;
import com.toshi.manager.network.EthereumService;
import com.toshi.model.local.Network;
import com.toshi.model.local.Networks;
import com.toshi.model.network.Balance;
import com.toshi.model.network.ExchangeRate;
import com.toshi.util.CurrencyUtil;
import com.toshi.util.FileNames;
import com.toshi.util.LogUtil;
import com.toshi.util.SharedPrefsUtil;
import com.tradewithluck.MainApplication;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

import rx.Completable;
import rx.Single;
import rx.Subscription;
import rx.schedulers.Schedulers;
import rx.subjects.BehaviorSubject;

import static com.toshi.util.EthUtil.BIG_DECIMAL_SCALE;

public class BalanceManager {

    private final static BehaviorSubject<Balance> balanceObservable = BehaviorSubject.create();
    private static final String LAST_KNOWN_BALANCE = "lkb";

    private HDWallet wallet;
    private SharedPreferences prefs;
    private Networks networks;
    private Subscription connectivitySub;

    /* package */ BalanceManager() {
    }

    public BehaviorSubject<Balance> getBalanceObservable() {
        return balanceObservable;
    }

    public void init(final HDWallet wallet) {
        this.wallet = wallet;
        this.networks = Networks.getInstance();
        initPrefs();
        initCachedBalance();
        return;
    }

    private void initPrefs() {
        this.prefs = MainApplication.get().getSharedPreferences(FileNames.BALANCE_PREFS, Context.MODE_PRIVATE);
    }

    private void initCachedBalance() {
        final Balance cachedBalance = new Balance(readLastKnownBalance());
        handleNewBalance(cachedBalance);
    }

    public void refreshBalance() {
        getBalance()
                .observeOn(Schedulers.io())
                .subscribe(
                        this::handleNewBalance,
                        this::handleBalanceError
                );
    }

    public Completable refreshBalanceCompletable() {
        return getBalance()
                .doOnSuccess(this::handleNewBalance)
                .toCompletable();
    }

    private Single<Balance> getBalance() {
        return EthereumService
                .getApi()
                .getBalance(this.wallet.getPaymentAddress())
                .subscribeOn(Schedulers.io());
    }

    private void handleNewBalance(final Balance balance) {
        writeLastKnownBalance(balance);
        balanceObservable.onNext(balance);
    }

    private void handleBalanceError(final Throwable throwable) {
        LogUtil.exception(getClass(), "Error while fetching balance", throwable);
    }

    public String toLocalCurrencyString(final ExchangeRate exchangeRate, final BigDecimal ethAmount) {
        final BigDecimal marketRate = exchangeRate.getRate();
        final BigDecimal localAmount = marketRate.multiply(ethAmount);

        final DecimalFormat numberFormat = CurrencyUtil.getNumberFormat();
        numberFormat.setGroupingUsed(true);
        numberFormat.setMaximumFractionDigits(2);
        numberFormat.setMinimumFractionDigits(2);

        final String amount = numberFormat.format(localAmount);
        final String currencyCode = CurrencyUtil.getCode(exchangeRate.getTo());
        final String currencySymbol = CurrencyUtil.getSymbol(exchangeRate.getTo());

        return String.format("%s%s %s", currencySymbol, amount, currencyCode);
    }

    private Single<String> getLocalCurrency() {
        return Single.fromCallable(SharedPrefsUtil::getCurrency);
    }

    private Single<BigDecimal> mapToLocalCurrency(final ExchangeRate exchangeRate,
                                                  final BigDecimal ethAmount) {
        return Single.fromCallable(() -> {
            final BigDecimal marketRate = exchangeRate.getRate();
            return marketRate.multiply(ethAmount);
        });
    }

    private Single<BigDecimal> mapToEth(final ExchangeRate exchangeRate,
                                        final BigDecimal localAmount) {
        return Single.fromCallable(() -> {
            if (localAmount.compareTo(BigDecimal.ZERO) == 0) {
                return BigDecimal.ZERO;
            }

            final BigDecimal marketRate = exchangeRate.getRate();
            if (marketRate.compareTo(BigDecimal.ZERO) == 0) {
                return BigDecimal.ZERO;
            }

            return localAmount.divide(marketRate, BIG_DECIMAL_SCALE, RoundingMode.HALF_DOWN);
        });
    }

    private String readLastKnownBalance() {
        return this.prefs
                .getString(LAST_KNOWN_BALANCE, "0x0");
    }

    private void writeLastKnownBalance(final Balance balance) {
        this.prefs
                .edit()
                .putString(LAST_KNOWN_BALANCE, balance.getUnconfirmedBalanceAsHex())
                .apply();
    }

    private Completable changeEthBaseUrl(final Network network) {
        return Completable.fromAction(() -> EthereumService.get().changeBaseUrl(network.getUrl()));
    }

    public void clear() {
        clearConnectivitySubscription();
        this.prefs
                .edit()
                .clear()
                .apply();
    }

    private void clearConnectivitySubscription() {
        if (this.connectivitySub == null) return;
        this.connectivitySub.unsubscribe();
    }
}
