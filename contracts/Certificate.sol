// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Certificate {

  struct Access{
    address user; 
    bool access; //true or false
    string file; //the file to be shared
  }

  mapping(address=>string[]) value;
  mapping(address=>mapping(address=>bool)) ownership;
  mapping(address=>Access[]) accessList;
  mapping(address=>mapping(address=>bool)) previousData;
  mapping(address => mapping(string => bool)) fileHashes;

  function add(address _user,string memory url) external {
      value[_user].push(url);
      fileHashes[_user][url] = true; //store the file hash
  }
    
//   function allow(address user, string memory file) external {
//       require(fileHashes[msg.sender][file], "File does not exist"); //check if the file exists
//       ownership[msg.sender][user]=true; 
//       if(previousData[msg.sender][user]){
//           for(uint i=0;i<accessList[msg.sender].length;i++){
//               if(accessList[msg.sender][i].user==user){
//                    accessList[msg.sender][i].access=true; 
//                    accessList[msg.sender][i].file = file; //update the file to be shared
//               }
//           }
//       }else{    
//            accessList[msg.sender].push(Access(user,true,file));  
//            previousData[msg.sender][user]=true;  
//       }
//   }
    function allow(address user, string memory file) external { 
        require(fileHashes[msg.sender][file], "File does not exist");
        ownership[msg.sender][user]=true;
        if (!hasAccess(msg.sender, user, file)) {
            accessList[msg.sender].push(Access(user, true, file));
        }  
    }  
  
//   function verifyFile(string memory url) public view returns(bool) {
//         return fileHashes[msg.sender][url];
//   }

    function verifyFile(address sender, address _user, string memory url) public view returns(bool) { 
        return hasAccess(_user, sender, url);
    }

  function disallow(address user) public{
      ownership[msg.sender][user]=false;
      for(uint i=0;i<accessList[msg.sender].length;i++){
          if(accessList[msg.sender][i].user==user){ 
              accessList[msg.sender][i].access=false;  
              accessList[msg.sender][i].file = ""; //remove the shared file
          }
      }
  }

  function display(address _user, string memory file) external view returns(string memory){
      require(_user==msg.sender || (ownership[_user][msg.sender] && hasAccess(msg.sender, _user, file)) ,"You don't have access"); //check if the user has access to the specific file
      return file;
  }

  function selfDisplay(address _user) external view returns(string[] memory){
      require(_user==msg.sender || ownership[_user][msg.sender],"You don't have access");
      return value[_user];
  }

  function shareAccess() public view returns(Access[] memory){
      return accessList[msg.sender];
  }

  function hasAccess(address sender, address _user, string memory file) internal view returns(bool) {
      for(uint i=0;i<accessList[_user].length;i++){
          if(accessList[_user][i].user==sender && keccak256(abi.encodePacked(accessList[_user][i].file)) == keccak256(abi.encodePacked(file))){
              return true;
          }
      }
      return false;
  }

  function hasAccess(address _user, string memory file) public view returns(bool) {
  for(uint i=0;i<accessList[_user].length;i++){
    if(accessList[_user][i].user==msg.sender && keccak256(abi.encodePacked(accessList[_user][i].file)) == keccak256(abi.encodePacked(file))){
      return true;
    }
  }
  return false; 
}

}
