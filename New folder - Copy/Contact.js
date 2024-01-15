import React from "react";

const Contact = () => {
  return (
    <section style={{ padding: "9rem 0 5rem 0" }}>
      <h2 className="common-heading">Contact us</h2>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d945.6456718509866!2d73.92419009442108!3d18.5477510953551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1eff1e988bf%3A0xde537e89c347da3f!2sPunyanagari%20Society%20-%20Federation!5e0!3m2!1sen!2sin!4v1683781474216!5m2!1sen!2sin"
        width="100%"
        height="250px"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div style={{ marginTop: "6rem", textAlign: "center" }}>
        <div className="contact-form" style={{ maxWidth: "50rem", margin: "auto" }}>
          <form
            action="https://formspree.io/f/xgedgjkr"
            method="POST"
            className="contact-inputs"
          >
            <input
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="off"
              required
            />

            <input
              type="email"
              name="Email"
              placeholder="Email"
              autoComplete="off"
              required
            />

            <textarea
              name="message"
              cols="30"
              rows="6"
              autoComplete="off"
              required
            ></textarea>

            <input type="submit" value="Send" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
