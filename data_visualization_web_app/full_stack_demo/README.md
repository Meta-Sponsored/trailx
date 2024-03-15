# TrailX — Aesthetic IoT & Web App Solution for Trail System | Object Detection-Based Interactive Displays, Python, React, GCP

<kbd><img src="https://uploads-ssl.webflow.com/63f32ff4aaac792cb769cedb/65f4ae5416ad011742436a19_trailx_full_stack_demo.png"/></kbd>

## Description

We use React as the front-end core of the dashboard, paired with the Tailwind CSS framework and Syncfusion UI elements. Additionally, we use Google Cloud Firebase as the backend. This web app can query data from Firebase uploaded by the IoT devices on the trail (for example, the number of pedestrians and cyclists) and display it on the website. To configure the IoT device and installation, check the `iot_edge_computing` folder.

## Acknowledgments

This project, TrailX, has been developed by modifying and extending open-source code, and we extend our gratitude to the original authors and contributors. We respect and adhere to the licensing terms of the original work, and hereby acknowledge that our application TrailX is developed under the corresponding open-source license.

Special thanks to the original author of [the **adrianhajdin/project_syncfusion_dashboard** repository, **Adrian Hajdin**](https://github.com/adrianhajdin/project_syncfusion_dashboard?tab=AGPL-3.0-1-ov-file#readme), whose foundational code has provided a solid base for our project. We also thank everyone who has supported and guided us, including our sponsors and mentors.

The project utilizes the following key technologies and frameworks:

- **React.js**: As the core of our front-end.
- **Tailwind CSS**: For styling.
- **Syncfusion UI components**: For rich UI elements.
- **Google Cloud Firebase**: For database.

Finally, we thank every member of the community whose feedback and suggestions have helped us continually improve **TrailX**.

## Getting Started

To rebuild the application on your local device, follow these simple steps.

1. Please watch the tutorial first to understand the file structure and how React and Tailwind.css work together.

    [![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/jx5hdo50a2M/0.jpg)](https://www.youtube.com/watch?v=jx5hdo50a2M)

2. In the project directory, please run: `npm install --legacy-peer-deps` to install all important packages.

   - `--legacy-peer-deps`: ignore all peerDependencies when installing, in the style of npm version 4 through version 6.
   - `--strict-peer-deps`: fail and abort the install process for any conflicting peerDependencies when encountered. By default, npm will only crash for peerDependencies conflicts caused by the direct dependencies of the root project.
   - `--force`: will force npm to fetch remote resources even if a local copy exists on disk.

3. Setting up your Google Firebase admin API.

4. Type `npm start` to run the web app.

   - Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
   - The page will reload when you make changes. You may also see any lint errors in the console.
