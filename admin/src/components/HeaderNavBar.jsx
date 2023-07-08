import main_logo from "./static/images/Logo.png"
import icons8_erson_96 from "./static/images/icons8-person-96.png"
import icons8_contact_us_96 from "./static/images/icons8-contact-us-96.png"
import icons8_globe_96 from "./static/images/icons8-globe-96.png"
import loop from "./static/images/loop.png"
import ticket from "./static/images/ticket.png"
import worlwide from "./static/images/worldwide.png";
import chat from "./static/images/chat.png"

import { NavLink } from "react-router-dom"


const HeaderNavBar = () => {
  return (
    <>
    <nav className="navbar  " id="top">
           <div className="container-fluid">
               <div  className="pic" >
               <NavLink to="/">
              <img src={main_logo}/>
              </NavLink>
               </div>
             <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
               <span className="navbar-toggler-icon"></span>
             </button>
             <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
               <div className="offcanvas-header">
               <NavLink to="/">
                   <img src={main_logo} style={{width: "90px"}}/>
               </NavLink>
                 <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
               </div>
               <div className="offcanvas-body">
                 <ul>
                       <img src={icons8_erson_96} className="person" style={{float: "left"}}/>
                       <li className="osob"><a href="#">Увійти</a></li>
                     <div style={{marginRight: "100px", marginTop: "25px"}}>
                        <img src={icons8_contact_us_96} className="us" style={{float: "left"}}/>
                        <li className="onas"><a href="#" >О нас</a></li>
                     </div></ul>
                         <div id="selec">
                        <img src={icons8_globe_96} className="world" style={{float: "left"}}/>
                        <select id="language-selector1">
                          <option value="uk">Українська</option>
                          <option value="en">English</option>
                          <option value="pl">Polski</option>
                       </select>
                             </div>


               </div>
             </div>
           </div>
         </nav>
         <nav className="navigation" id="top2">
         <NavLink to="/">
            
            <img src={main_logo} />
         </NavLink>
            <ul style={{color:"white"}}>
               <select id="language-selector">
                  <option value="uk">Українська</option>
                  <option value="en">English</option>
                  <option value="pl">Polski</option>
               </select>
               <li ><NavLink to="/about-us">Про нас</NavLink></li>
               <li><NavLink to="/user-profile">Особистий кабінет</NavLink></li>
            </ul>
         </nav>
    {/* <main>
      <div>
          

         <div className="row1">
            <div className="column1">
               <h2 className="">Забронюйте свою наступну автобусну поїздку. </h2>
               <h3>І насолоджуйтеся безпроблемним плануванням подорожей з Atass.</h3>
            </div>
            <div className="column2">
            </div>
         </div>
         <div className="container">
            <div className="big">
              <div className="input-group" >
               <div className="form-floating mb-3">
                  <input type="text" id="from" className="form-control" placeholder="Звідки?" name="from" autocomplete="off" required/>
                  <label for="from">Звідки?</label>
               </div>
               <div className="form-floating mb-3">
                  <input type="text" id="to" className="form-control" name="to" placeholder="Куди?" autocomplete="off" required />
                  <label for="to">Куди?</label>
               </div>


               <div className="form-floating mb-3">
                  <input type="date" id="date" class="form-control" name="date" placeholder="Коли?" autocomplete="off" required />
                  <label for="date">Коли?</label>
               </div>

                <button type="submit" className="btn" style={{backgroundColor: "#40ABCF", color:"white", height: "59px"}} id="knop">
                  <img src={loop}/>
                  <span>Шукати</span>
                </button>
              </div>
            </div>
            <div className="small">
                <div className="input-group1" >
                    <div className="form-floating mb-3">
                         <input type="text" id="from1" className="form-control" name="from" placeholder="Звідки?" autocomplete="off" required style={{display: "block"}}/>
                         <label for="from1">Звідки?</label>
                    </div>
                       </div>
                       <div className="input-group1" >
                           <div className="form-floating mb-3">
                         <input type="text" id="to1" class="form-control" name="to" placeholder="Куди?" autocomplete="off" required style={{display: "block"}}/>
                                <label for="to1">Куди?</label>
                           </div>
                       </div>
                       <div className="input-group1" >
                           <div className="form-floating mb-3">
                         <input type="date" id="date1" class="form-control" name="date" autocomplete="off" required style={{display: "block"}}/>
                               <label for="date1">Коли?</label>
                           </div>
                       </div>
                       <div class="input-group1"  id="small3">
                         <button type="submit" className="btn" style={{backgroundColor: "#40ABCF",color:"white", display: "block" }} id="knop">
                           <img src={loop}/>
                           <span>Шукати</span>
                         </button>
                       </div>
            </div>

            </div> 
      </div>
    </main>
    <div class="row">
               <div class="col-sm-4">
                  <div class="d-flex">
                     <img src={ticket} alt="Image" class="img-fluid mr-3" />
                     <p>Шукаєте квитки на автобус, які відповідають вашому графіку та бюджету?</p>
                  </div>
               </div>
               <div class="col-sm-4">
                  <div class="d-flex">
                     <img src={worlwide} alt="Image" class="img-fluid mr-3" />
                     <p>Попрощайтеся з нескінченними пошуками автобусних квитків. Наша платформа дозволяє забронювати ідеальну подорож.</p>
                  </div>
               </div>
               <div class="col-sm-4">
                  <div class="d-flex">
                     <img src={chat} alt="Image" class="img-fluid mr-3" />
                     <p>Потрібна допомога з бронюванням? Наша команда доступна цілодобово, щоб допомогти вам.</p>
                  </div>
               </div>
            </div>
            <div class="container-1">
         <div class="cloud-box">
            <h2 class="mb-4">Куди ви хочете їхати?</h2>
         </div>
         <div class="row" style={{paddingBottom: "50px"}} id="card">
            <div class="col" >
               <div class="card">
                  <div class="card-body route_card_body">
                     <div class="sq">
                        Київ
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon sc-ktwOSD kPQuM sc-dGAOeH GAPhQ" width="24" height="24" aria-hidden="true">
                           <g fill="none" stroke="#708C91" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" transform="rotate(180 12 12)">
                              <path d="M9 19l-7-7 7-7"></path>
                              <path d="M22 12H2"></path>
                           </g>
                        </svg>
                        Варшава
                     </div>
                     <div >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon2 sc-ktwOSD kPQuM" width="24" height="24" aria-hidden="true">
                           <polyline fill="none" stroke="#708C91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="9 18 15 12 9 6"></polyline>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col">
               <div class="card">
                  <div class="card-body route_card_body">
                     <div >
                        Варшава
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon sc-ktwOSD kPQuM sc-dGAOeH GAPhQ" width="24" height="24" aria-hidden="true">
                           <g fill="none" stroke="#708C91" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" transform="rotate(180 12 12)">
                              <path d="M9 19l-7-7 7-7"></path>
                              <path d="M22 12H2"></path>
                           </g>
                        </svg>
                        Київ
                     </div>
                     <div >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon2 sc-ktwOSD kPQuM" width="24" height="24" aria-hidden="true">
                           <polyline fill="none" stroke="#708C91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="9 18 15 12 9 6"></polyline>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
            <div class="col">
               <div class="card">
                  <div class="card-body route_card_body">
                     <div >
                        Київ
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon sc-ktwOSD kPQuM sc-dGAOeH GAPhQ" width="24" height="24" aria-hidden="true">
                           <g fill="none" stroke="#708C91" stroke-width="2" stroke-miterlimit="10" stroke-linejoin="round" stroke-linecap="round" transform="rotate(180 12 12)">
                              <path d="M9 19l-7-7 7-7"></path>
                              <path d="M22 12H2"></path>
                           </g>
                        </svg>
                        Львів
                     </div>
                     <div >
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="kirk-icon2 sc-ktwOSD kPQuM" width="24" height="24" aria-hidden="true">
                           <polyline fill="none" stroke="#708C91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="9 18 15 12 9 6"></polyline>
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div> */}
    </>
  )
}

export default HeaderNavBar