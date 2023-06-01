import "./VModal.css";

const VModal = ({ setVModalOpen, contract }) => {

  const verify = async () => {
    const sender = document.getElementById("address1").value;
    const user = document.getElementById("address2").value;
    const hash = document.getElementById("hash").value;
    const val = await contract.verifyFile(sender, user, hash)
    console.log(val)
    alert("Verified :", val)
    // setVModalOpen(false);
  };

  return (
    <>
      <div className="modalBackground z-20 ">
        <div className="modalContainer">
          <div className="title text-4xl mb-3 font-semibold drop-shadow-lg">Verify</div>
          <div className="body">
            <input
              id="address1"
              type="text"
              className="p-2 rounded-md text-center border-gray-500 border "
              placeholder="Authorising Body Address"
            ></input>
            </div>
            <div>
            <input
              id="address2"
              type="text"
              className="p-2 rounded-md text-center border-gray-500 border"
              placeholder="Authorised Body Address"
            ></input>
            </div>
            <div>
            <input
              id="hash"
              type="text"
              className="p-2 rounded-md text-center border-gray-500 border"
              placeholder="Hash/Link of File"
            ></input>
          </div>
          <div className="footer">
            <button className="button-9 px-0 h-20"
              onClick={() => {
                setVModalOpen(false);
              }}
              id="cancelBtn"
            >
              Go Back
            </button>
            <button className="button-9" onClick={() =>verify()}>Verify</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default VModal;