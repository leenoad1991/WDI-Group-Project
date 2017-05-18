
WDI - Group Project

Brief
RESTful, authenticated App..

Thursday
Decide on an idea and talk through the various components and challenges.

Friday
Planning
*Research the API - we need something that has price, information, location of vineyard and a picture.
*Plan out the different models - Our wine, user and live price.
*setting and assigning tasks for the next 6 days.
*setting up the file structure and constantly committing to Git.
##models
####user
```
{
	id: _blah,
	name: _name,
	email: _email,
	password: _password
	PasswordConfirmation: _ PasswordConfirmation
	watching: {
				[wine_id]
				},
	basket:	{
				[wine_id]
				}
	orders: 	{
				past_orders: [order_string],
				current_orders: [order_string]
				},
	priviledges:    {
				admin: true/false,
				stock_view: true/false,
				add_stock: true/false,
				user_crud: true/false
				}
}			
```
####wine
```
{
	id: _id,
	name: _name,
	info: {
			type: white/red/rose,
			grape: _grape,
			year: _year
			}
	description: descriptionString,
	label: image,
	location: {
				country: _country,
				region: _region,
				lat: _lat,
				lng: _lng
				}
	price: 	{
				min: _min,
				max: _max,
				retail: _retail
				}
	watched:
}


```
---

### Concept
- Graphic 
- Description


Planning & Mockups
- 


### Demo 
##### Basic User
##### Admin User

### 

# -- Market-X --

# Introduction
Market-X is the first online market place for goods that behave like a true commodities market. By taking user actions we can affect the price of goods across the whole  system. 

We designed Market-X to be a zero-sum game. If one price goes up the others are effected and reduced to accomidate for this increase invalue. What this has allowed us to do is create a system where we can simply emter how much profit we want to make from our total stock and that amount of profit is guranteed. 
## Concept
#### Idea Development
We developed this idea over the Friday afternoon on the first day of the project. Instead of having an idea and figuring out what we wanted to achieve with that idea, we instead shifted to aligning all our goals, figuring out targets and then making a product fit those goals. Thus Market-X was born. 

Market-X fits the spec of the assignment and goes above and beyond what we learned. It was a challenge that we felt comfortable reaching for and one that we undertook gladly. 

##### Our Initial Goals
<!--![planning-group-project-2](https://cloud.githubusercontent.com/assets/25775232/26201999/a8033ef6-3bcd-11e7-84a6-60328f8b0a2e.JPG)-->
<em> The room where we started planning </em>

Our initial goals for the project where to make a store where the value of the products could change and be update live. They would be effected by user interaction. Effectively making a stock market but for an online store.

The goals we were set are as follows: 

* Node.JS Express API
* Authenticated App
* Users
* CRUD MongoDB
* Angular Front End

The goals we set for ourselves were - 

* Multiple end points
* Authentication redirection 
* Live Price updating
* Watching functionality
* Refferenced Models


#### Planning
<img width="1280" alt="trello-mastery" src="https://cloud.githubusercontent.com/assets/25775232/26202140/31b2464c-3bce-11e7-8bbf-e49e13433571.png"

To say that we were maticulous in our planning would be an understatement. We went above and beyond to make sure that every stage of product and development was accounted for and planned. 

We set up timetables, gave ourselves deadlines and worked to schedules. This finite control allowed us to complete an MVP of the given assigned spec within 24 hours and achieve <strong> full MVP </strong> (what we hoped to acheive, barebones shippable product) by Wednesday of the following week. 

Trello was a useful resource that we added to and updated as we went along. We ended up with a large amount of completed functionality is a great feeling.

Further down in the Stages section we outline further our goals for each stage. 

<img width="1280" alt="screen shot 2017-05-18 at 14 22 58" src="https://cloud.githubusercontent.com/assets/25775232/26204073/8ff69760-3bd5-11e7-8b12-9a0735355744.png"



#### Git
<!--<img width="268" alt="git-mastery" src="https://cloud.githubusercontent.com/assets/25775232/26202097/02e7ffb4-3bce-11e7-8bfd-b843fb760175.png">-->

<em> We distributed a simple example of the steps of using Git so that we all knew what to do </em>

One of the biggest challenges that we knew we were going to face was working effectively as a colloborative team. Using Github to push and pull different builds. Making sure that we had minimal conflicts with merges and that no one lost the work they had been engaging on. 

To achieve this we spent 30 mins practising typical tasks on the Friday before we had even started coding. Further we started to plan around the git merges making sure that we would push and pull when everyone was in agreement and doing so in a logical manner. I.e. the largest changes were merged first and then the smaller changes were implemented in a waterfall style.

We also made it a priority to announce what files you were working in and when. If you were working in a file that someone else was then we would discuss the changes before commiting and pushing the merges. 

<strong> Key Takeaways </strong>

* Plan your product development
* Branch off immediately upon pulling the latest version
* Waterfall the merge process
* Don't work on the same files as your team mates
* Complete features before moving on to the next one

#### Designing
<!--![colors](https://cloud.githubusercontent.com/assets/25775232/26203296/99192950-3bd2-11e7-89f0-288748f61126.png)
-->
<br> 
<em> Very early on we decided on a colour scheme that we wanted to adhere to. Simple tonal reds that would pervay the site </em>
<br>

<!--![wine-index](https://cloud.githubusercontent.com/assets/25775232/26203307/a12dfd46-3bd2-11e7-97d5-4370f17c7f79.png)
-->
<br>
<em> The index page for products was going to be the main content of the page and thus we decided to do an advanced wireframe for it.</em>
<br>

<!--![wine-show](https://cloud.githubusercontent.com/assets/25775232/26203299/9cf2d922-3bd2-11e7-9f10-922759aa2792.png)-->

<br>
<em> The show page for products was going to be another main page for content thus we decided to do an advanced wireframe for it as well.</em>
<br>

These designs were particularly useful because they allowed everyone to work towards the same goal and we had little issues with clashes over what we thought the website should look like. 

They also allowed us to better visualise how we wanted the final product to look and to act. 




## Walkthrough (4 min)
### Basic User
#### Reactionary Prices
#### Buy Now
### Admin User
#### Backend
## Stage 1
#### Challenges/Win (2 min) 
## Stage 2</strong>
#### Challenges/Win (2 min) with Code
## Stage 3</strong>
#### Challenges/Win (2 min) with Code
## Stage 4 - Wishlist</strong>
### Future 
#### Market of Markets (Graphic)
#### Stripe Integration (Lee)
#### Backend Analysis 
## Biggest Takeaways </strong>
#### Development in Teams
#### Efficient Planning & Task Delegation
#### Next Project
##### Sacrifices (Error, CSS, Testing, File Organisation)
##### Success (Amount achieved, completing our spec)











