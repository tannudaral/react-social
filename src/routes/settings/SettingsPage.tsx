import { Dispatch, SetStateAction, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToogleSwitch from "../../components/form/ToogleSwitch";
import AppwriteService from "../../database/appwriteService";
import useAccount from "../../hooks/AccountHook";

export default function SettingsPage(props: {
  appwriteService: AppwriteService;
  darkmode: boolean;
  setDarkmode: Dispatch<SetStateAction<boolean>>;
}) {
  const [account] = useAccount(props.appwriteService);

  let navigate = useNavigate();

  useEffect(() => {
    if (account === null) {
      navigate("/login");
      return;
    }
  }, [account]);

  return (
    <div>
      <h1 className="mt-6 text-center text-5xl font-extrabold ">Settings</h1>
      <br />
      <div className="flex justify-center">
        <ToogleSwitch
          toogle={props.darkmode}
          setToogle={() => props.setDarkmode(!props.darkmode)}
        ></ToogleSwitch>
      </div>
    </div>
  );
}
