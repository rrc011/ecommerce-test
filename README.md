
<!-- PROJECT LOGO -->
<br />
<p align="center">
  

  <h3 align="center">Ecommerce Test</h3>
</p>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Online store application following the criteria established in the test

![Product Name Screen Shot](https://github.com/rrc011/ecommerce-test/blob/main/_screenshots/Screenshot_3.png?raw=true)

![Product Name Screen Shot](https://github.com/rrc011/ecommerce-test/blob/main/_screenshots/Screenshot_1.png?raw=true)

![Product Name Screen Shot](https://github.com/rrc011/ecommerce-test/blob/main/_screenshots/Screenshot_2.png?raw=true)


### Built With

This project was built with the following frameworks, as well as following best practices.
* [Angular](https://angular.io/ "Angular")
* [Admin LTE](https://www.npmjs.com/package/admin-lte "Admin LTE")
* [Bootstrap](https://getbootstrap.com)
* [JQuery](https://jquery.com)
* [ASP.NET Boilerplate](https://aspnetboilerplate.com/ "ASP.NET Boilerplate")



<!-- GETTING STARTED -->
## Getting Started

In order to start the project, follow the instructions below

### Prerequisites

- Node min version 12
- .Net Core 3.1
- Sql Server Instance
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/rrc011/ecommerce-test.git
   ```
2. Open your solution in Visual Studio 2017 v15.3.5+ and build the solution.

3. Select the 'Web.Host' project as the startup project.

4. Check the connection string in the appsettings.json file of the Web.Host project, change it if you need to. 

5. Open the Package Manager Console and run an Update-Database command to create your database (ensure that the Default project is selected as .EntityFrameworkCore in the Package Manager Console window).

6. Run the application. It will show swagger-ui if it is successful. 

7.  Open angular folder in Visual Studio code. 

7. Install NPM packages
   ```sh
   npm install
   ```
7. Run The Application
   ```sh
   npm start
   ```



<!-- USAGE EXAMPLES -->
## Usage

List of users to test the application

|User Name   | Password   | Type   |
| ------------ | ------------ | ------------ |
|  Admin  | 123qwe  | Administrator  |
|  Supplier  |  123qwe  | Supplier  |
|  Client  |  123qwe  |  Client  |


1.  First, you must enter as an administrator and add the products that the suppliers will use to supply.

2.  Then you must enter as a supplier and add the availability of the products and the estimated delivery time.

3.  Then you must log in as an administrator to be able to supply the items available from the suppliers.

4.  Finally you must enter as a customer and buy the products.


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Rafael Rodriguez - rafaelrodriguez111294@gmail.com

Project Link: [https://github.com/rrc011/ecommerce-test](https://github.com/rrc011/ecommerce-test)
