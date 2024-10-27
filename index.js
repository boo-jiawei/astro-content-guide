const apiUrl = "https://contenthub-api.eco.astro.com.my/channel/all.json";
const getAstroContentGuide = async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const channels = data.response;

    console.log(channels);

    const channelGrid = document.getElementById("channelGrid");

    channels.forEach((channel) => {
      const card = document.createElement("div");
      card.className = "channel-card";

      const logo = document.createElement("img");
      logo.className = "channel-logo";
      logo.src = channel.imageUrl;
      logo.alt = "channel logo";

      const info = document.createElement("div");
      info.className = "channel-info";
      info.innerHTML = `
        <div class = "channel-number"> CH${channel.stbnumber}</div>
        <div class = "channel-title"> ${channel.title}</div>
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
