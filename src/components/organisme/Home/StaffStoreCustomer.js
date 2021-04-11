import { YellowLogo } from '../../atoms'

export default function StaffStoreCustomer(){
   return(
      <div className="rubikFont staffStoreCustomersStample" style={{justifyContent: "space-between"}}>
         <div className="displayRow insideThreeS">
            <div className="displayRow insideStaffStoreCustomers">
               <YellowLogo img="https://user-images.githubusercontent.com/77045083/113892278-0bbfda80-97f0-11eb-856e-0064ef5455d9.png" imgHeight="1.5vw" imgWidth="1.3vw"/>
               <div className="displayColumn insideSSSText">
                  <p className="noMargin numberTextSSS">90+</p>
                  <p className="noMargin contentTextSSS">Staff</p>
               </div>
            </div>
            <div className="displayRow insideStaffStoreCustomers" style={{borderLeft: "0.1vw solid #EEEFF2", borderRight: "0.1vw solid #EEEFF2", width: "40%"}}>
               <YellowLogo img="https://user-images.githubusercontent.com/77045083/113892282-0c587100-97f0-11eb-84c0-a1dbea04aac7.png" imgHeight="1.5vw" imgWidth="1vw"/>
               <div className="displayColumn insideSSSText">
                  <p className="noMargin numberTextSSS">30+</p>
                  <p className="noMargin contentTextSSS">Stores</p>
               </div>
            </div>
            <div className="displayRow insideStaffStoreCustomers">
               <YellowLogo img="https://user-images.githubusercontent.com/77045083/113892274-0a8ead80-97f0-11eb-8f8f-88bd6cfdfd92.png" imgHeight="1.5vw" imgWidth="1.8vw"/>
               <div className="displayColumn insideSSSText">
                  <p className="noMargin numberTextSSS">800+</p>
                  <p className="noMargin contentTextSSS">Customers</p>
               </div>
            </div>
         </div>
      </div>
   )
}