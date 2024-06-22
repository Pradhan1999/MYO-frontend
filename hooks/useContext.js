// import { DashboardContext } from '@/context/DashboardContext';
// import { ReportContext } from '@/context/ReportContext';
// import { SubscriptionContext } from '@/context/SubscriptionContext';
// import { TradeContext } from '@/context/TradeContext';
import { AuthContext } from "@/provider/auth.provider";
import { useContext } from "react";
// import { AuthContext } from 'src/context/AuthContext';

export const useAuth = () => useContext(AuthContext);
// export const useTrade = () => useContext(TradeContext);
// export const useReport = () => useContext(ReportContext);
// export const useDashboard = () => useContext(DashboardContext);
// export const useSubscription = () => useContext(SubscriptionContext);
