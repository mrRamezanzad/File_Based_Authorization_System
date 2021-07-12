# File_Based_Authorization_System

This is a system to ***signup, login and logout without database*** and just by keeping ***data in files*** locally.
for ***UI*** we used ***tailwind*** css library which gives you different feeling of using this app.

![login page](screenshots/login.jpg)
> givin proper errors in different situations is a consistent feature of our apps

### other pages of application

- Register

  ![register page](screenshots/register.jpg)

- Dashboard 

  ![Dashboard](screenshots/dashboard.jpg)
- incorrect pages
  
  ![404](screenshots/404.jpg)

### Dashboard Features
- editing user informations

  ![editing user](screenshots/editing.jpg)

- logout
  
  ![logging out dashboard](screenshots/logout.jpg 'how you see logout button normally')
  ![logout account](screenshots/logout--hover.jpg 'when logout button is hovered')

### Security Features
- no one can get into dashboard without login
  > if you try to get into dashboard without logging in you'll be  redirected to login page

- if user changes password, system will log them out to make sure they remember the correct password
  
- Proper messaging in different cases
  
  - login and logout
    
    ![login message](screenshots/login--message.jpg)
    ![logout message](screenshots/logout--message.jpg)

  - successfully editing user informations 
  
    ![editing message](screenshots/edit--message.jpg)
    
  - if the identification is failed

    ![identification error](screenshots/wrong-user.jpg)

  - empty inputs

    ![empty inputs](screenshots/empty.jpg)
    ![empty inputs](screenshots/editing--errors.jpg)
