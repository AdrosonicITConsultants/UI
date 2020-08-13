import { createMemoryHistory, createBrowserHistory } from "history";

export const memoryHistory = createMemoryHistory({
  initialEntries: ["/"]
});

export const browserHistory = createBrowserHistory();
