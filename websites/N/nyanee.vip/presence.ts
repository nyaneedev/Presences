const presence = new Presence({ clientId: "914832619995275314" });

type StateData = {
  details?: string;
  state?: string;
  largeImageKey?: string;
  largeImageText?: string;
  smallImageKey?: string;
  smallImageText?: string;

  startTimestamp?: number;
  endTimestamp?: number;
};

let stateData: StateData = {};

const fetchData = () => {
  const d = (selector: string): string | undefined =>
      document.querySelector(`#pmd-data ${selector}`)?.innerHTML,
    parseIntOpt = (s: string | undefined): number | null =>
      s ? parseInt(s) : null,
    details = d("#pmd-details"),
    state = d("#pmd-state"),
    largeImageKey = d("#pmd-large-image-key"),
    largeImageText = d("#pmd-large-image-text"), // PreMiD likes to set this to "PreMiD 🐧 v<...> • Ext v<...>", so not really helpful
    smallImageKey = d("#pmd-small-image-key"),
    smallImageText = d("#pmd-small-image-text"),
    startTimestamp = parseIntOpt(d("#pmd-start-timestamp")),
    endTimestamp = parseIntOpt(d("#pmd-end-timestamp"));

  stateData = {
    state,
    details,
    largeImageKey,
    largeImageText,
    smallImageKey,
    smallImageText,
    startTimestamp,
    endTimestamp
  };

  Object.keys(stateData).forEach((key: keyof StateData) =>
    // eslint-disable-next-line no-undefined
    stateData[key] === undefined || stateData[key] === null
      ? delete stateData[key]
      : {}
  );
};

setInterval(fetchData, 10000);

const buildPresence = (stateData: StateData) => {
  return {
    ...stateData,
    instance: false
  };
};

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = buildPresence(stateData);
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
