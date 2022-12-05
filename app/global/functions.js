import moment from "moment";
import { sendNotification } from "../api/expoPushToken";
export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//function that takes a date as input and returns the time in format hh:mm am/pm
export const getTime = (date) => {
  return moment(date).format("hh:mm a");
};

//function that takes a date as input and returns the date in format dddd, MMMM Do YYYY
export const getDate = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY");
};

export const getUserAndSendNotification = async (
  id,
  users = [],
  bodyRequest,
  route
) => {
  //find the user with the id in the users array and get the token
  const user = users.find((user) => user.id === id);
  const token = user.token;
  console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn", token);
  //send notification to the user
  const message = {
    to: token,
    sound: "default",
    title: "Ride Request",
    body: bodyRequest,
    data: { route: route },
  };

  sendNotification(message);
};
