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
        if (MainApplication.getWallet() != null) {
            address = MainApplication.getWallet().getOwnerAddress();
        }
        cb.invoke("Address: " + address);
    }

    @ReactMethod
    public void getAddress(Callback cb) {
        String address = "Address Not ready";
        if (MainApplication.getWallet() != null) {
            address = MainApplication.getWallet().getOwnerAddress();
        }
        cb.invoke(address);
    }

    @ReactMethod
    public void getMasterSeed(Callback cb) {
        String seed = "Seed Not ready";
        if (MainApplication.getWallet() != null) {
            seed = MainApplication.getWallet().getMasterSeed();
        }
        cb.invoke(seed);
    }

    @ReactMethod
    public void signTransaction(final String data, Callback cb) {
        String result = "";
        if (MainApplication.getWallet() != null) {
            result = MainApplication.getWallet().signTransaction(data);
        }
        cb.invoke(result);
    }
}
