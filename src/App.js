import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import SignIn from "./component/pages/Account/SignIn";
import { ResetPassword } from "./component/pages/Account/ResetPassword";
import SignUp from "./component/pages/Account/SignUp";
import ForgetPassword from "./component/pages/Account/ForgetPassword";
import Sidebar from "./component/layout/NavBar/Sidebar";
import AddInventory from "./component/pages/Actions/AddInventory";
import AmazonRepricing from "./component/pages/Actions/AmazonRepricing";
import BulkImport from "./component/pages/Actions/BulkImport";
import ProductCatalog from "./component/pages/Actions/ProductCatalog";
import Channels from "./component/pages/Channles/Channels";
import AmazonConnect from "./component/pages/Channles/connectpages/AmazonConnect";
import BigcommerceConnect from "./component/pages/Channles/connectpages/BigcommerceConnect";
import EbayConnect from "./component/pages/Channles/connectpages/EbayConnect";
import EbayComponent from "./component/pages/Channles/connectpages/EbayComponent";
import NewEgg from "./component/pages/Channles/connectpages/NewEgg";
import SearsConnect from "./component/pages/Channles/connectpages/SearsConnect";
import ShopifyConnect from "./component/pages/Channles/connectpages/ShopifyConnect";
import UspsConnect from "./component/pages/Channles/connectpages/UspsConnect";
import WallmartConnect from "./component/pages/Channles/connectpages/WallmartConnect";
import WishConnect from "./component/pages/Channles/connectpages/WishConnect";
import Dashboard from "./component/pages/Dashboard/Dashboard";
import ExportOrder from "./component/pages/Order/ExportOrder";
import ChannelSettings from "./component/pages/setting/ChannelSettings";
import Listings from "./component/pages/Actions/Listings";
import Mapping from "./component/pages/Actions/Mapping";
import AddTemplate from "./component/pages/Actions/AddTemplate";
import SelectChannelPopup from "../src/component/layout/Poppers/SelectChannelPopup";
import OrderListing from "./component/pages/Order/OrderListing";
import Shipment from "./component/pages/Order/Shipment";
import Notification from "./component/pages/Notification/Notification";
import EmailSettings from "./component/pages/setting/EmailSettings";
import AccountSettings from "./component/pages/setting/AccountSettings";
import BillingSettings from "./component/pages/setting/BillingSettings";
import Report from "./component/pages/Report/Report";
import PurgeCatalog from "./component/pages/setting/PurgeCatalog";
import ByTime from "./component/pages/Report/ByTime";
import BySku from "./component/pages/Report/BySku";
import LowStock from "./component/pages/Report/LowStock";
import MostStock from "./component/pages/Report/MostStock";
import Palkotemplate from "./component/pages/Actions/Palkotemplate";
import CreateShppingOrder from "./component/pages/Order/CreateShppingOrder";
import GenerateLable from "./component/pages/Order/GenerateLable";
import DataProvider from "./component/context/DataProvider";
import { UserView } from "./rtk/features/user/UserView";
import { Dummy } from "./component/Dummy";
import ViewDetails from "./component/pages/Popups/ViewDetails";
import EditTemplate from "./component/pages/Actions/EditTemplate";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <>
      <Sidebar />
      <Outlet />
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        {/* --------------------Account section------------------------------------------ */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          {/* --------------------Dashboard------------------------------------------ */}
          <Route
            path="/Dashboard"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Dashboard" element={<Dashboard />} />
          </Route>
          {/* --------------------redux test----------------------------- */}

          <Route
            path="/reduxuser"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/reduxuser" element={<UserView />} />
          </Route>
          {/* -------------------------------------------------------- */}

          {/* --------------------Channel and Connect page------------------------------------------ */}
          <Route
            path="/Channels"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Channels" element={<Channels />} />
          </Route>
          <Route
            path="/amazonconnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/amazonconnect" element={<AmazonConnect />} />
          </Route>
          <Route
            path="/walmartconnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/walmartconnect" element={<WallmartConnect />} />
          </Route>
          <Route
            path="/EbayConnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/EbayConnect" element={<EbayConnect />} />
          </Route>
          <Route
            path="/ebayCompleted"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/ebayCompleted" element={<EbayComponent />} />
          </Route>
          <Route
            path="/SearsConnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/SearsConnect" element={<SearsConnect />} />
          </Route>
          <Route path="/NewEgg" element={<PrivateRoute isAuthenticated={""} />}>
            <Route path="/NewEgg" element={<NewEgg />} />
          </Route>
          <Route
            path="/wishconnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/wishconnect" element={<WishConnect />} />
          </Route>
          <Route
            path="/BigcommerceConnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route
              path="/BigcommerceConnect"
              element={<BigcommerceConnect />}
            />
          </Route>
          <Route
            path="/ShopifyConnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/ShopifyConnect" element={<ShopifyConnect />} />
          </Route>
          <Route
            path="/UspsConnect"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/UspsConnect" element={<UspsConnect />} />
          </Route>

          {/*-------------------------------------Action------------------------------------------*/}

          <Route
            path="/AddInventory"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/AddInventory" element={<AddInventory />} />
          </Route>

          <Route
            path="/bulkimport"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/bulkimport" element={<BulkImport />} />
          </Route>

          <Route
            path="/AddTemplate"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/AddTemplate" element={<AddTemplate />} />
          </Route>
          <Route
            path="/editTemplate/:id"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/editTemplate/:id" element={<EditTemplate />} />
          </Route>

          <Route
            path="/Mapping"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Mapping" element={<Mapping />} />
          </Route>

          <Route
            path="/ProductCatalog"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/ProductCatalog" element={<ProductCatalog />} />
          </Route>
          <Route
            path="/viewDetails/:id"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/viewDetails/:id" element={<ViewDetails />} />
          </Route>

          <Route path="/SelectChannelPopup" element={<SelectChannelPopup />} />

          <Route
            path="/Listings"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Listings" element={<Listings />} />
          </Route>

          <Route
            path="/palkotemplate"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/palkotemplate" element={<Palkotemplate />} />
          </Route>

          <Route
            path="/AmazonRepricing"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/AmazonRepricing" element={<AmazonRepricing />} />
          </Route>

          {/*-------------------------------------Order------------------------------------------*/}
          <Route
            path="/ExportOrder"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/ExportOrder" element={<ExportOrder />} />
          </Route>

          <Route
            path="/OrderListing"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/OrderListing" element={<OrderListing />} />
          </Route>

          <Route
            path="/Shipment"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Shipment" element={<Shipment />} />
          </Route>

          <Route
            path="/CreateShppingOrder"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route
              path="/CreateShppingOrder"
              element={<CreateShppingOrder />}
            />
          </Route>

          <Route
            path="/GenerateLable"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/GenerateLable" element={<GenerateLable />} />
          </Route>
          {/*-------------------------------------Notification------------------------------------------*/}
          <Route
            path="/Notification"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/Notification" element={<Notification />} />
          </Route>

          {/*-------------------------------------Report------------------------------------------*/}
          <Route path="/Report" element={<PrivateRoute isAuthenticated={""} />}>
            <Route path="/Report" element={<Report />} />
          </Route>

          <Route path="/ByTime" element={<PrivateRoute isAuthenticated={""} />}>
            <Route path="/ByTime" element={<ByTime />} />
          </Route>
          <Route path="/BySku" element={<PrivateRoute isAuthenticated={""} />}>
            <Route path="/BySku" element={<BySku />} />
          </Route>
          <Route
            path="/LowStock"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/LowStock" element={<LowStock />} />
          </Route>
          <Route
            path="/MostStock"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/MostStock" element={<MostStock />} />
          </Route>
          {/*-------------------------------------Settings------------------------------------------*/}

          <Route
            path="/channelseting"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/channelseting" element={<ChannelSettings />} />
          </Route>
          <Route
            path="/EmailSettings"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/EmailSettings" element={<EmailSettings />} />
          </Route>
          <Route
            path="/AccountSettings"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/AccountSettings" element={<AccountSettings />} />
          </Route>
          <Route
            path="/BillingSettings"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/BillingSettings" element={<BillingSettings />} />
          </Route>
          <Route
            path="/PurgeCatalog"
            element={<PrivateRoute isAuthenticated={""} />}
          >
            <Route path="/PurgeCatalog" element={<PurgeCatalog />} />
          </Route>

          {/* <Route path='/Dummy' element={<Dummy />} /> */}
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
