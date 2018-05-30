package com.tradewithluck;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.toshi.crypto.HDWallet;
import com.tradewithluck.wallet.RNPackage;

public class MainApplication extends Application implements ReactApplication {
  private static MainApplication instance;
  public static MainApplication get() { return instance; }

  private static HDWallet wallet;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new RNPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    instance = this;

    HDWallet w = new HDWallet();
    HDWallet lwallet = w.getExistingWallet().toBlocking().value();

    if (lwallet == null) {
      lwallet = w.createWallet()
              .toBlocking().value();
    }
    this.setWallet(lwallet);

    SoLoader.init(this, /* native exopackage */ false);
  }

  private void setWallet(HDWallet wallet) {
    this.wallet = wallet;
  }

  public static HDWallet getWallet() {
    return wallet;
  }
}
