import { useEffect } from "react";
import "./Modal.css";
const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.getElementById("address").value;
    await contract.allowAll(address);
    setModalOpen(false);
  };
  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div className="modalBackground z-20">
        <div className="modalContainer ">
          <div className="title text-4xl mb-3 font-semibold drop-shadow-lg">Share with</div>
          <div className="body">
            <input
              type="text"
              id="address"
              // className="address"
              placeholder="Enter Address"
              className="p-1 rounded-md text-center border-gray-500 border  mb-3"
            ></input>
          </div>
          <form id="myForm">
            <select id="selectNumber" className="p-2  rounded-md text-center border-gray-500 border ">
              <option className="address">People With Access</option>
            </select>
          </form>
          <div className="footer">
            <button className="button-9"
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button className="button-9" onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;