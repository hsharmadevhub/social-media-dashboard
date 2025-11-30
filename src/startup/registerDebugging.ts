import config from "config";
import createDebug from "debug";

export default function () {
  // Resolve final DEBUG value
  const namespaces: string = config.get("debugNamespace");

  // Enable the namespace at runtime
  createDebug.enable(namespaces);

  // Create debug logger for app
  const debug = createDebug("app:startup");
  debug("Starting application with namespaces:", namespaces);
}
