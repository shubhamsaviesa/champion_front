import userReducer from "../features/user/userSlice";
import WalmartReducer from "../features/Marketplace/WalmartSlice";
import SearsReducer from "../features/Marketplace/SearsSlice";
import NeweggReducer from "../features/Marketplace/NeweggSlice";
import EbayReducer from "../features/Marketplace/EbaySlice";
import AmazonReducer from "../features/Marketplace/AmazonSlice";
import WishReducer from "../features/Marketplace/WishSlice";
import uspsReducer from "../features/Marketplace/UspsSlice";
import authReducer from "../features/auth/authSlice";
import channelsettingReducer from "../features/Settings/ChannelSettingsSlice";
import inventoryFormReducer from "../../rtk/features/Action/addInventorySlice";
import ProductcatalogReducer from "../../rtk/features/Action/productCatalogsSlice";
import ListingReducer from "../../rtk/features/Action/ListingSlice";

import dataReducer from "../../rtk/features/Action/testSlice";
import ChannelActiveDataReducer from "../features/Marketplace/ChannelActiveSlice";
import bulkimportDataReducer from "../features/Action/bulkImportSlice";
import bigcommerceReducer from "../features/Marketplace/BigcommerceSlice";
import shopifyReducer from "../features/Marketplace/ShopifySlice";
import FinalMappingReducer from "../features/Action/FinalMappingSlice";
import OrderReducer from "../features/order/orderSlice";
import AddOrderReducer from "../features/order/AddOrderSlice";
import NotificationReducer from "../features/Notification/notificationSlice";
import EmailReducer from "../features/Settings/emailSlice";
import BillingReducer from "../features/Settings/billingSettingSlice";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  Amazon: AmazonReducer,
  Walmart: WalmartReducer,
  Sears: SearsReducer,
  Newegg: NeweggReducer,
  Ebay: EbayReducer,
  Wish: WishReducer,
  usps: uspsReducer,
  shopify: shopifyReducer,
  bigcommerce: bigcommerceReducer,
  channelsetting: channelsettingReducer,
  inventoryForm: inventoryFormReducer,
  ProductCatalog: ProductcatalogReducer,
  Listing: ListingReducer,
  theStore: dataReducer,
  ChannelActiveData: ChannelActiveDataReducer,
  bulkimport: bulkimportDataReducer,
  FinalMapping: FinalMappingReducer,
  Order: OrderReducer,
  AddOrder: AddOrderReducer,
  Notification: NotificationReducer,
  Emaill: EmailReducer,
  BillingData: BillingReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// export const store = configureStore({
//   reducer: persistedReducer,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
