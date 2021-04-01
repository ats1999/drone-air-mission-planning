import { useRouter } from "next/router";
import { useEffect } from "react";
import { updatePageViews } from "@utils/js/pageViews";
import Typography from "@material-ui/core/Typography";
export default function AboutUs() {
  const router = useRouter();
  useEffect(() => {
    updatePageViews(router.pathname);
  }, []);
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
      <Typography align="center" component="h1" variant="h4">
        HOW DOES B-Dev-G USE COOKIES?
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        A cookie is a small piece of data that a website asks your browser to
        store on your computer or mobile device. The cookie allows the website
        to “remember” your actions or preferences over time.
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        Most browsers support cookies, but users can set their browsers to
        decline them and can delete them whenever they like.
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        If you use B-Dev-G , both B-Dev-G and third parties will use cookies to
        track and monitor some of your activities on and off B-Dev-G , and store
        and access some data about you, your browsing history, and your usage of
        B-Dev-G .
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        This policy describes how both B-Dev-G and other third parties use
        cookies both within and without B-Dev-G and how you can exercise a
        better control over cookies. Please keep in mind that this may alter
        your experience with our platform, and may limit certain features
        (including being logged in as a user).
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        General Browsing: We use cookies that are important for certain
        technical features of our website, like logging into user accounts and
        implementing fixes and improvements to our platform.
      </Typography>{" "}
      <br />
      <br />
      <Typography align="left" component="p" variant="body1">
        These cookies help us:
        <ul>
          <li>
            Remember users’ custom preferences and help create more useful
            products
          </li>
          <li>
            Allow users to opt out of certain types of modeling, tailoring, or
            personalization in our products.
          </li>
          <li>
            Collect information on our users’ preferences in order to create
            more useful products.
          </li>
          <li>
            Cookies can also be used for online behavioural target advertising
            and to show adverts relevant to something that the user searched for
            in the past
          </li>
        </ul>
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Advertising: We use cookies to enable advertising with our third-party
        Partners, which in turn allows us to provide many of our services free
        of charge.
      </Typography>
      <Typography component="p" variant="body1">
        These cookies:
        <ul>
          <li>
            Customize the ad experience for our users, including tailoring job
            and display ads to the technologies a person has previously looked
            at, the communities a person has visited, and the job ads a person
            has already seen
          </li>
          <li>
            Allow direct communication between a 3rd party partner who hosts a
            promotional event with us, and users who have opted into the
            promotion
          </li>
          <li>
            Allow us to track when a B-Dev-G user sees or clicks on an ad or
            later visits a third-party website or purchases a product on a
            third-party website
          </li>
          <li>
            Collect impressions and click data for internal reporting and
            product optimization
          </li>
        </ul>
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Analytics: We use cookies to compile usage activity in order to better
        cater our Products and Services offerings to you, and to third parties.
        We DO NOT share identifiable “raw” data with our clients or any third
        parties, however we do make high-level decisions based on aggregated
        data about your usage of our Products and Services.
      </Typography>
      <Typography component="p" variant="body1">
        These cookies:
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Monitor site traffic and behavior flows of users Measure the
        effectiveness of on-site products Measure the effectiveness of off-site
        marketing campaigns and tactics WHAT INFORMATION IS COLLECTED ON ME VIA
        COOKIES?
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        In general, we collect most data from you via form submission. However,
        there are cases when visiting our site and/or using our platforms in
        which we may receive certain information through the use of cookies.
        This data will generally not include personally identifying information
        about you.
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Unique identification tokens User preferences Third Party Cookies
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        The use of cookies, the names of cookies, and other cookies related
        cookies technology may change over time and B-Dev-G will make all
        reasonable efforts to notify you. Please also note that companies and
        other organization that sponsor pages on B-Dev-G may use cookies or
        other technologies to learn more about your interest in their products
        and services and in some cases to tailor such products and services to
        you.
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        HOW DO I RESTRICT COOKIES?
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Please note that B-Dev-G may not work properly and you may have
        diminished functionality if you wish to opt-out of certain cookies.
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        If you decide that you do not want cookies to be set on your device by
        our third-party Partners, you can adjust the settings on your internet
        browser and choose from the available Cookies setting to best meet your
        preferences. While setting options may vary from browser to browser, you
        can generally choose to reject some or all cookies, or instead to
        receive a notification when a cookie is being placed on your device. For
        more information, please refer to the user help information for your
        browser of choice. Please keep in mind that cookies may be required for
        certain functionalities, and by blocking these cookies, you may limit
        your access to certain parts or features of our sites and platforms.
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        Finally, while cookies are set for varying durations on your device, you
        can manually delete them at any time. However, deleting cookies will not
        prevent the site from setting further cookies on your device unless you
        adjust the settings discussed above.
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        CONTACT US
      </Typography>{" "}
      <br />
      <br />
      <Typography component="p" variant="body1">
        If you have any questions, comments, or concerns regarding this Cookies
        Policy, please contact B-Dev-G at:{" "}
        <a
          target="_blank"
          href="https://github.com/bdevg/contact-us/issues/new"
        >
          Github
        </a>
      </Typography>{" "}
      <br />
      <br />
    </div>
  );
}
