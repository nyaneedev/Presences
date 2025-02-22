const presence = new Presence({
  clientId: "812025934617509949"
});
let points: string, progress: string;
presence.on("iFrameData", (data: IFrameData) => {
  ({ points, progress } = data.info);
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  presenceData.details = `Contributing to: ${points}`;
  presenceData.state = `Project Progress: ${progress}`;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});

interface IFrameData {
  info: {
    points: string;
    progress: string;
  };
}
