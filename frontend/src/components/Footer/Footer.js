import React from "react";

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__mobile-block">
        <div className="footer__mobile-link-block">
          <img
            class="footer__mobile-link-icon"
            src="assets/icons/suggestions.svg"
            alt=""
          />
          <span class="footer__mobile-link-label text--white">Suggestions</span>
        </div>
        <div class="footer__mobile-link-block">
          <a href="" class="footer__mobile-link">
            <img
              class="footer__mobile-link-icon"
              src="assets/icons/requests.svg"
              alt=""
            />
            <span class="footer__mobile-link-label text--white">Requests</span>
          </a>
        </div>
        <div class="footer__mobile-link-block">
          <a href="" class="footer__mobile-link">
            <img
              class="footer__mobile-link-icon"
              src="assets/icons/blog.svg"
              alt=""
            />
            <span class="footer__mobile-link-label text--white">Blog</span>
          </a>
        </div>
        <div class="footer__mobile-link-block">
          <a href="" class="footer__mobile-link">
            <img
              class="footer__mobile-link-icon"
              src="assets/icons/api.svg"
              alt=""
            />
            <span class="footer__mobile-link-label text--white">API</span>
          </a>
        </div>
        <div class="footer__mobile-link-block">
          <a href="" class="footer__mobile-link">
            <img
              class="footer__mobile-link-icon"
              src="/assets/icons/rss.svg"
              alt=""
            />
            <span class="footer__mobile-link-label text--white">RSS</span>
          </a>
        </div>
        <div class="footer__mobile-link-block">
          <a href="" class="footer__mobile-link">
            <img
              class="footer__mobile-link-icon"
              src="assets/icons/contact.svg"
              alt=""
            />
            <span class="footer__mobile-link-label text--white">Contact</span>
          </a>
        </div>
      </div>
      <div className="bordered  brdr--clear footer__bar">
        <span className="d--ib text--gray">YTS @ 2011-2020</span>
        <ul className="d--ib footer--list">
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              Blog
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              DMCA
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              API
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              RSS
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              Contact
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              Browse Movies
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              Requests
            </a>
          </li>
          <li class="d--ib footer__list-item">
            <a href="" class="d--ib text--bold link text--gray">
              Login
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Footer;
