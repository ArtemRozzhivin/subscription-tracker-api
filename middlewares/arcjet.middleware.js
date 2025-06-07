import arcjetConfig from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    if (process.env.NODE_ENV !== "production") {
      return next();
    }

    const decision = await arcjetConfig.protect(req);

    if (decision.isDenied()) {
      if (isRateLimit(decision)) {
        res.status(429).json({ error: "Too Many Requests" });
      } else if (isBot(decision)) {
        res.status(403).json({ error: "Bot detected" });
      } else {
        res.status(403).json({
          error: "Access denied",
        });
      }

      return;
    }

    next();
  } catch (error) {
    console.log("Arcjet error", error);
    next(error);
  }
};

export default arcjetMiddleware;

const isRateLimit = (decision) => {
  return decision.reason.isRateLimit();
};

const isBot = (decision) => {
  return decision.reason.isBot();
};
