
      let customers = [];
      const capacity = 25;
      let seatsLeft = 25;
      let guestCount=React.createRef();
      let guestName=React.createRef();
      let phoneNumber=React.createRef();
      let updateBtn=React.createRef();

      // Create form submit handler here
      function clearInput(){
        guestCount.current.value="";
        guestName.current.value="";
        phoneNumber.current.value="";
      }
      function addToList(e){
        e.preventDefault();
        if(guestCount.current.value>seatsLeft){
          return alert("Guest count exceeds capacity");
        }
        let customer={
          guestName:guestName.current.value,
          guestCount:guestCount.current.value,
          phoneNumber:phoneNumber.current.value,
          checkIn:new Date().toLocaleTimeString(),
          checkout:"-",
        }
        seatsLeft-=guestCount.current.value;
        customers.push(customer);
        clearInput();
        rootElement.render(<App />);

      }
      function deleteCustomer(e){
      let targetIndex=e.target.dataset.class
      if(e.target.previousSibling.innerText!="Served")
      seatsLeft+=parseInt(customers[targetIndex].guestCount);
      customers.splice(targetIndex,1);
      rootElement.render(<App />);
     
      }
      function updateStatus(e){
        let targetIndex=parseInt(e.target.dataset.class);
        customers[targetIndex].checkout=new Date().toLocaleTimeString();
        seatsLeft+=parseInt(customers[targetIndex].guestCount);
        rootElement.render(<App />);
        e.target.innerText="Served";

      }
      const App = () => (
        <div className="App" style={{ textAlign: "center" }}>
          <h1>Customer Maintaining App</h1>
          <div>
            <h2>Total Capacity: {capacity}</h2>
            <h2>Seats Left: {seatsLeft}</h2>
          </div>
          {/* Create a form here */}
          <form>
            <input type="number" placeholder="Guests Count" ref={guestCount}/><br/>
            <input type="text" placeholder="Primary Guest Name" ref={guestName}/><br/>
            <input type="text" placeholder="Phone Number" ref={phoneNumber}/>
            <br/><br/>
            <button id="add-entry" onClick={addToList}>Add Entry</button>
          </form>
          <br/><br/>
          {/* Complete table to show records of customers */}
          <div id="table-box">
          <table border="1px" style={{ margin: "auto" }}>
            <thead>
            <tr id="head">
              <th>Count</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Remove Entry</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer,index)=>(
              <tr key={index}>
                <td>{customer.guestCount}</td>
                <td>{customer.guestName}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.checkIn}</td>
                <td>{customer.checkout}</td>
                <td class="ter-btn" data-class={index} onClick={updateStatus}>Click to Checkout</td>
                <td class="ter-btn" data-class={index} onClick={deleteCustomer}>Delete</td>
              </tr>
             ))}
            </tbody>
            </table>
            </div>
        </div>
      );

      const rootElement = ReactDOM.createRoot(document.getElementById("root"));
      rootElement.render(<App />);
