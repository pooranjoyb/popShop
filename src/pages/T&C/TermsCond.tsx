import { useEffect } from "react";
import Head from "../../components/Head";

function TermsCond() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="mx-auto max-w-screen-xl mb-20 flex-row px-4 pt-8 sm:pt-8 pb-4 ">
        <div className="flex gap-4 items-center">
          <div className="group-text text-center">
            <Head h2="Terms and Conditions" />
            <div className="m-5">
              <p className="mb-3 text-center font-bold">Welcome to Pop Shop!</p>
              <p className="m-3 text-justify">
                These terms and conditions outline the rules and regulations
                for the use of Pop Shop's Website, located at <div className="underline"><a href="https://pop-shop-github.vercel.app/">
                  pop-shop-github.vercel.app.</a></div>
              </p>
              <p className="m-3 text-justify">
                By accessing this website we assume you accept these terms and
                conditions. Do not continue to use Pop Shop if you do not
                agree to take all of the terms and conditions stated on this
                page.
              </p>
              <p className="m-3 text-justify">
                The following terminology applies to these Terms and
                Conditions, Privacy Statement and Disclaimer Notice and all
                Agreements: "Client", "You" and "Your" refers to you, the
                person log on this website and compliant to the Company's
                terms and conditions. "The Company", "Ourselves", "We", "Our"
                and "Us", refers to our Company. "Party", "Parties", or "Us",
                refers to both the Client and ourselves. All terms refer to
                the offer, acceptance and consideration of payment necessary
                to undertake the process of our assistance to the Client in
                the most appropriate manner for the express purpose of meeting
                the Client's needs in respect of provision of the Company's
                stated services, in accordance with and subject to, prevailing
                law of in. Any use of the above terminology or other words in
                the singular, plural, capitalization and/or he/she or they,
                are taken as interchangeable and therefore as referring to
                same.
              </p>
            </div>
          </div>
          <div className="group-img hidden md:block">
            <img src="/images/t&c.jpg" alt="t&c" />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="group-img hidden md:block">
            <img src="/images/cookies.png" alt="cookies" />
          </div>
          <div className="group-text text-center">
            <Head h2="Cookies" />
            <div className="m-5">
              <p className="m-3 text-justify">
                We employ the use of cookies. By accessing Pop Shop, you
                agreed to use cookies in agreement with the Pop Shop's Privacy
                Policy.{" "}
              </p>
              <p className="m-3 text-justify">
                Most interactive websites use cookies to let us retrieve the
                user's details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website. Some of our
                affiliate/advertising partners may also use cookies.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="group-text text-center">
            <Head h2="License" />
            <div className="m-5">
              <p className="m-3 text-justify">
                Unless otherwise stated, Pop Shop and/or its licensors own the
                intellectual property rights for all material on Pop Shop. All
                intellectual property rights are reserved. You may access this
                from Pop Shop for your own personal use subjected to
                restrictions set in these terms and conditions.
              </p>
              <p className="m-3 text-justify font-bold">You must not:</p>
              <ul className="list-disc">
                <li className="mx-3 ml-6 text-justify">Republish material from Pop Shop</li>
                <li className="mx-3 ml-6 text-justify">Sell, rent or sub-license material from Pop Shop</li>
                <li className="mx-3 ml-6 text-justify">Reproduce, duplicate or copy material from Pop Shop</li>
                <li className="mx-3 ml-6 text-justify">Redistribute content from Pop Shop</li>
              </ul>

              <p className="m-3 text-justify">
                Parts of this website offer an opportunity for users to post
                and exchange opinions and information in certain areas of the
                website. Pop Shop does not filter, edit, publish or review
                Comments prior to their presence on the website. Comments do
                not reflect the views and opinions of Pop Shop,its agents
                and/or affiliates. Comments reflect the views and opinions of
                the person who post their views and opinions. To the extent
                permitted by applicable laws, Pop Shop shall not be liable for
                the Comments or for any liability, damages or expenses caused
                and/or suffered as a result of any use of and/or posting of
                and/or appearance of the Comments on this website.
              </p>
              <p className="m-3 text-justify">
                Pop Shop reserves the right to monitor all Comments and to
                remove any Comments which can be considered inappropriate,
                offensive or causes breach of these Terms and Conditions.
              </p>
              <p className="m-3 text-justify font-bold">You warrant and represent that:</p>
              <ul className="list-disc">
                <li className="mx-3 ml-6 text-justify">
                  You are entitled to post the Comments on our website and
                  have all necessary licenses and consents to do so;
                </li>
                <li className="mx-3 ml-6 text-justify">
                  The Comments do not invade any intellectual property right,
                  including without limitation copyright, patent or trademark
                  of any third party;
                </li>
                <li className="mx-3 ml-6 text-justify">
                  The Comments do not contain any defamatory, libelous,
                  offensive, indecent or otherwise unlawful material which is
                  an invasion of privacy
                </li>
                <li className="mx-3 ml-6 text-justify">
                  The Comments will not be used to solicit or promote business
                  or custom or present commercial activities or unlawful
                  activity.
                </li>
              </ul>
              <p className="m-3 text-justify">
                You hereby grant Pop Shop a non-exclusive license to use,
                reproduce, edit and authorize others to use, reproduce and
                edit any of your Comments in any and all forms, formats or
                media.
              </p>
            </div>
          </div>
          <div className="group-img hidden md:block">
            <img src="/images/license.png" alt="t&c" />
          </div>
        </div>
      </div>
    </>
  );
}
export default TermsCond;
