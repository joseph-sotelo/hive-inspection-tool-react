import { useContext } from "react";
import { ClientsDataContext } from "./ClientsData";

export const useClientsData = () => useContext(ClientsDataContext);