
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
