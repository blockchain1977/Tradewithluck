package com.tradewithluck;

import android.arch.lifecycle.Lifecycle;
import android.arch.lifecycle.OnLifecycleEvent;
import android.content.Context;
import android.support.multidex.MultiDex;
import android.support.multidex.MultiDexApplication;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.toshi.manager.BalanceManager;
import com.toshi.manager.ToshiManager;
import com.toshi.manager.TransactionManager;
import com.tradewithluck.wallet.RNPackage;

public class MainApplication extends MultiDexApplication implements ReactApplication {
  private static MainApplication instance;
  public static MainApplication get() { return instance; }
  private boolean inBackground = false;

  private ToshiManager toshiManager;

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
  protected void attachBaseContext(Context newBase) {
    super.attachBaseContext(newBase);
    MultiDex.install(this);
  }

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    instance = this;
    init();

    SoLoader.init(this, /* native exopackage */ false);
  }

    private void init() {
        initToshiManager();
    }

    private void initToshiManager() {
        this.toshiManager = new ToshiManager();
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_RESUME)
    public void onResumed() {
        if (!this.inBackground) return;
        this.inBackground = false;
    }

    @OnLifecycleEvent(Lifecycle.Event.ON_STOP)
    public void onStop() {
        this.inBackground = true;
    }

    public boolean isInBackground() { return this.inBackground; }


    public final ToshiManager getToshiManager() {
        return this.toshiManager;
    }

    public final TransactionManager getTransactionManager() {
        return this.toshiManager.getTransactionManager();
    }

    public final BalanceManager getBalanceManager() {
        return this.toshiManager.getBalanceManager();
    }
}
