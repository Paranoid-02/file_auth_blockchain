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
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Verify</div>
          <div className="body">
            <input
              id="address1"
              type="text"
              placeholder="Authorising Body Address"
            ></input>
            </div>
            <div>
            <input
              id="address2"
              type="text"
              placeholder="Authorised Body Address"
            ></input>
            </div>
            <div>
            <input
              id="hash"
              type="text"
              placeholder="Hash/Link of File"
            ></input>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setVModalOpen(false);
              }}
              id="cancelBtn"
            >
              Go Back
            </button>
            <button onClick={() =>verify()}>Verify</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default VModal;