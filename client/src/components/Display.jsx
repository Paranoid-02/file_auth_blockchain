import { useState } from 'react'
import "./Display.css"

const Display = ({contract,account}) => {

  const [data, setData] = useState(null)
  const [data1, setData1] = useState(null)

  const getAllData = async () => {
      let dataArray;
      // const otherAddress = document.querySelector(".address").value
      try{
          dataArray = await contract.selfDisplay(account);
      }catch(e){
          alert("you don't have access");
        }
      
        const isEmpty = Object.keys(dataArray).length === 0
        if(!isEmpty){
          const str = dataArray.toString();
          const str_array = str.split(',');
          // console.log(str_array)
          const files = str_array.map((item,i) => {
            const sendFileHash = async () => {
              const address = document.getElementById("address").value
              // console.log(address,item)
              await contract.allow(address,item);
              console.log(item);
            }

            return(
            <div key={i} >
            <a href={item}>
              <img
                key={i}
                src={item}
                alt="new"
                className="image-list"
              ></img>
            </a>
              <input
                type="text"
                placeholder="Enter Address"
                id='address'
              ></input>
              <button onClick={sendFileHash} className='button'>Issue this</button>
            </div>
            )
          })
          setData(files)
        }else{
          alert("No file found")
        }
  }

  const getData = async () => {
    let dataArray;
    let test;
    const address = document.querySelector(".address").value
    try{
        dataArray = await contract.selfDisplay(address);
    }catch(e){
      alert("you don't have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0
        if(!isEmpty){
          const str = dataArray.toString();
          const str_array = str.split(',');
          // console.log(str_array)
          // const selectedFiles = str_array.map(async(item,i) => {

          //   const check = async () => {
          //     try{
          //       let d = await contract.display(address,item); 
          //       if(d == item){
          //         console.log(d==item)
          //         return true;
          //       }else{
          //         return false;
          //       }
          //     }
          //     catch(e){
          //       console.log("error")
          //     }
          //   }
          //   if(check()){
          //   return (
          //   <div key={i} >
          //   <a href={item}>
          //     <img
          //       key={i}
          //       src={item}
          //       alt="new"
          //       className="image-list"
          //     ></img>
          //   </a>
          //   </div>
          //   )}else{
          //     alert("No files to show")
          //   }
          // })
          let a= [];
          for(let i = 0;i<str_array.length;i++){
            // const check = async () => {
            //   try{
            //     let d = await contract.display(address,str_array[i]); 
            //     if(d == str_array[i]){
            //       // console.log(d==str_array[i])
            //       return true;
            //     }else{
            //       return false;
            //     }
            //   }
            //   catch(e){
            //     console.log("e")
            //   }
            // }
            if (await contract.hasAccess(address, str_array[i])) { 
              const d = await contract.display(address, str_array[i]);
              a.push(d)
            } else {
              continue; 
            }

            // if(check()){
            //   console.log(str_array[i])
            //   setData(str_array[i])
            // }else{
            //   alert("No files to show")
            // }
          }
          const selectedFiles = a.map((item,i) => {
            return (
                <div key={i} >
                <a href={item}>
                  <img
                    key={i}
                    src={item}
                    alt="new"
                    className="image-list"
                  ></img>
                </a>
                </div>
                )
          })
          setData(selectedFiles)
        }else{
          alert("No file found")
        }
  }

  return (
    <>
    <div className='image-list'>{data}</div>
    <input type="text" placeholder='Enter Address' className='address'></input>
    <button className='center button' onClick={getAllData}>Get All Data</button>
    <button className='center button' onClick={getData}>Get Data</button>
    </>
  )
}

export default Display