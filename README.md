# CX Front End Test 🧠

## Intro 👋

Hello future Boss!
I hope this message finds you in good health! I included this README file to outline what you expect to see in the project! Thank you for your time and I'm looking forward to hopefully working with you!

## What's in there? ❓

*Here are the key features and points of this project:*
- A functional reactJS application with conventional and organized folder structure.
- Well documented and commented clean code that is easy to follow in steps.
- Login Page that works only when entering the username(_demo_) and password
(_demo_).
- A dashboard page containing two one time-series charts, one using **Highcharts.js** and the other using **D3.js**.(I'm completley new to both and had to learn them from point 0).
- Fetching data from the JSON API provided.
- Unit testing using Jest for the login validation logic.

## Code Functionality 🏗️

- #### App.js
    Simply renders either the Login or the Dashboard page according to a state variable `loggedIn`.

- #### Login Page
    A simple static serverless login authentication logic tied to a simply designed front end page. After a successful login, the user is redirected to the dashboard page.

- #### Dashboard Page
    Here the charts and analytics are present. For the sake of this demo, only two charts were provided (same chart but using two different libraries).

- #### config.js
    Includes some separate configurations for the Highchart and the D3 charts.  

- #### D3Chart Component
    Renders the **D3.js** logo above the svg of the time series chart. (it fetches the data and does all the work alone, using d3Config from **config.js**)

- #### HighChart Component
    Renders the **Highchart.js** logo above the svg of the time series chart. (it fetches the data and does all the work alone, using HCConfig from **config.js**)

---

## Why I did an extra chart 🤔

After the technical interview, it came to my attention that the company works a lot with **D3.js**. I never used or seen the syntax of the library(neither **Highcharts.js**) so I thought this project would be an opportunity to do so and at the same time showcase my fast learning for you.

## What I think 💪

This was an amazing experience that I loved! I am exited to transform this passion to production everyday. I loved working with **D3.js** more because it provied a lower (way lower) level of abstraction which made a lot of customiztions easy and possible as opposed to **highcharts.js** which is also great and provides so many cool functionalities out of the box! 

> Hope to see you soon and have a good day! :heart:

