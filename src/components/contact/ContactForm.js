import React from "react";
import "../../styling/styles/contactus.css"
const ContactForm = ({ setSelected, name, setName, email, setEmail, phone, setPhone, subject, setSubject, SubmitForm }) => {

    return (
        <>
            <h3>Contact Form</h3>
            <div className="containerContact">
                <form>
                    <label htmlFor="fname">Full Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} className="textInput" type="text" id="fname" placeholder="Your full name.." />
                    <label htmlFor="country">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="textInput" type="text" id="country" placeholder="Your Email" />
                    <label htmlFor="phone">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="textInput" type="text" id="phone" placeholder="Your Phone No..." />
                    <label htmlFor="subject">Subject</label>
                    <textarea value={subject} onChange={e => setSubject(e.target.value)} id="subject" className="textarea" placeholder="Write something.." style={{ height: 200 }} />
                    <input onClick={SubmitForm} className="bg-primary submitInput w-100" type="button" defaultValue="Submit" />
                </form>
                <div className="social">
                    <div className=" bg-primary text-white w-100" onClick={() => setSelected(0)}>Back To Login</div>
                    {/* <div className="fb">Facebook</div> */}
                </div>
            </div>

        </>
    )
}


export default ContactForm