import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="footer-address">
          <p className="footer-address-1">
            <i class="fas fa-location-arrow"></i>  268 Lý Thường Kiệt{" "}
            <span>Phường 14, Quận 10, Thành phố Hồ Chí Minh</span>
          </p>
          <p className="footer-address-phone">
            <i class="fas fa-phone-volume"></i> 0123456789
          </p>
          <p className="footer-address-email">
            <i class="far fa-envelope-open"></i> quang.dinhleak_tb@hcmut.edu.vn
          </p>
        </div>
        <div className="footer-we">
          <h2 className="footer-we-title">About the RESmart</h2>
          <p className="footer-we-description">
            RESmart was made to complete the assignment.
          </p>
          <div className="footer-we-social">
            <a href="https://www.facebook.com/gio.thu.01.101/">
              <i class="fab fa-facebook"></i>
            </a>
            <a href="https://www.youtube.com/channel/UCD8oyO_L7IcEV4B4kI0I9GA">
              <i class="fab fa-youtube"></i>
            </a>
            <a>
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/suoncha/restaurantweb">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
