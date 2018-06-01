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

import com.toshi.crypto.HDWallet;

import com.toshi.model.network.SentTransaction;
import com.toshi.model.network.SignedTransaction;
import com.toshi.manager.transaction.TransactionSigner;

import rx.Single;
import rx.subscriptions.CompositeSubscription;

public class TransactionManager {

    private HDWallet wallet;
    private TransactionSigner transactionSigner;

    /*package */ TransactionManager() {
        initTransactionSigner();
    }

    private void initTransactionSigner() {
        this.transactionSigner = new TransactionSigner();
    }

    public TransactionManager init(final HDWallet wallet) {
        this.wallet = wallet;
        transactionSigner.setWallet(wallet);
        return this;
    }

    public Single<SentTransaction> sendSignedTransaction(final SignedTransaction signedTransaction) {
        return this.transactionSigner.sendSignedTransaction(signedTransaction);
    }

    public HDWallet getWallet() {
        return wallet;
    }
}