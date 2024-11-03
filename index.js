const apiUrl = "https://contenthub-api.eco.astro.com.my/channel/all.json";

const formatTime = (datetime) => {
  
const date = new Date(datetime)

let hours = date.getHours()
let minutes = date.getMinutes()

const day = hours >= 12 ? "PM" : "AM";


hours = hours % 12 || 12;

const formatMinutes = minutes.toString().padStart(2,"0")

return `${hours}:${formatMinutes} ${day}`

}

const getAstroContentGuide = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const channels = data.response; // array of all channels

    const channelGrid = document.getElementById("channelGrid");
  

    channels.forEach((channel) => {
      const card = document.createElement("div");
      card.className = "channel-card";

      const currentSchedule = channel?.currentSchedule || [];

      console.log(channel)
      console.log(currentSchedule[0].title);

      const logo = document.createElement("img");
      logo.className = "channel-logo";
      logo.src = channel.imageUrl;
      logo.alt = "channel logo";

      const info = document.createElement("div");
      info.className = "channel-info";
      info.innerHTML = `
        <div class = "channel-number"> CH${channel.stbNumber}</div>
        <div class = "channel-title"> ${channel.title}</div>
        <div class = "playing-now"> On Now ${currentSchedule[0].title}</div>
        <div class = "playing-next"> Next ${formatTime(currentSchedule[1].datetime)} ${currentSchedule[1].title}</div>
        <div class = "playing-later"> Later ${formatTime(currentSchedule[2].datetime)} ${currentSchedule[2].title}</div>
        `;

      card.appendChild(logo);
      card.appendChild(info);

      channelGrid.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};

getAstroContentGuide();
