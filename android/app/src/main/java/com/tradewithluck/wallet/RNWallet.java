package com.tradewithluck.wallet;

import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.tradewithluck.MainApplication;

public class RNWallet extends ReactContextBaseJavaModule {
    public RNWallet(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNWallet";
    }

    @ReactMethod
    public void test(String message, Callback cb) {
        String address = "Address Not ready";
        if (MainApplication.get().getTransactionManager().getWallet() != null) {
            address = MainApplication.get().getTransactionManager().getWallet().getOwnerAddress();
        }
        cb.invoke("Address: " + address);
    }

    @ReactMethod
    public void getAddress(Callback cb) {
        String address = "Address Not ready";
        if (MainApplication.get().getTransactionManager().getWallet() != null) {
            address = MainApplication.get().getTransactionManager().getWallet().getOwnerAddress();
        }
        cb.invoke(address);
    }

    @ReactMethod
    public void getMasterSeed(Callback cb) {
        String seed = "Seed Not ready";
        if (MainApplication.get().getTransactionManager().getWallet() != null) {
            seed = MainApplication.get().getTransactionManager().getWallet().getMasterSeed();
        }
        cb.invoke(seed);
    }

    @ReactMethod
    public void signTransaction(final String data, Callback cb) {
        //TODO: To update
        String result = "";
        if (MainApplication.get().getTransactionManager().getWallet() != null) {
            result = MainApplication.get().getTransactionManager().getWallet().signTransaction(data);
        }
        cb.invoke(result);
    }
}
