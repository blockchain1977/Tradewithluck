package com.toshi.manager.network;

import com.toshi.model.network.Balance;
import com.toshi.model.network.SentTransaction;
import com.toshi.model.network.ServerTime;
import com.toshi.model.network.SignedTransaction;
import com.toshi.model.network.TransactionRequest;
import com.toshi.model.network.UnsignedTransaction;

import org.web3j.crypto.RawTransaction;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3jFactory;
import org.web3j.protocol.core.DefaultBlockParameterName;
import org.web3j.protocol.core.methods.response.EthGetBalance;
import org.web3j.protocol.core.methods.response.EthGetTransactionCount;
import org.web3j.protocol.http.HttpService;

import java.math.BigInteger;
import java.util.Observable;
import java.util.concurrent.ExecutionException;

import rx.Single;

/**
 * Created by kyle.yu on 3/14/2018.
 */

public class EthereumWeb3J implements EthereumInterface {
    Web3j web3j;
    EthereumInterface builtInter;

    public EthereumWeb3J(EthereumInterface inter) {
        web3j = Web3jFactory.build(new HttpService("http://ec2-52-199-0-93.ap-northeast-1.compute.amazonaws.com:8545/"));
        builtInter = inter;
    }

    @Override
    public Single<UnsignedTransaction> createTransaction(TransactionRequest request) {

        return Single.create(emitter -> {
            EthGetTransactionCount ethGetTransactionCount = null;
            try {
                ethGetTransactionCount = web3j.ethGetTransactionCount(
                        request.getFrom(), DefaultBlockParameterName.LATEST).sendAsync().get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }
            BigInteger nonce = ethGetTransactionCount.getTransactionCount();

// create our transaction
            RawTransaction rawTransaction  = RawTransaction.createEtherTransaction(
                    nonce, new BigInteger("50"), new BigInteger("1000000"), request.getTo(), new BigInteger("10000000"));

            UnsignedTransaction b = new UnsignedTransaction();
//            b.setGas(rawTransaction.getGasLimit().toString());
//            b.setGasPrice(rawTransaction.getGasPrice().toString());
//            b.setNonce(rawTransaction.getNonce().toString());
//            b.setValue(rawTransaction.getValue().toString());
            // b.setTransaction(rawTransaction.get);
            emitter.onSuccess(b);
        });
    }

    @Override
    public Single<SentTransaction> sendSignedTransaction(long timestamp, SignedTransaction transaction) {
        return builtInter.sendSignedTransaction(timestamp, transaction);
    }

    @Override
    public Single<Balance> getBalance(String walletAddress) {
        return Single.create(emitter -> {
// send asynchronous requests to get balance
            EthGetBalance ethGetBalance = null;
            try {
                ethGetBalance = web3j
                        .ethGetBalance(walletAddress, DefaultBlockParameterName.LATEST)
                        .sendAsync()
                        .get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

            String wei = ethGetBalance.getBalance().toString();

            Balance b = new Balance(wei);
            emitter.onSuccess(b);
        });

    }

    @Override
    public Single<ServerTime> getTimestamp() {
        return builtInter.getTimestamp();
    }

}