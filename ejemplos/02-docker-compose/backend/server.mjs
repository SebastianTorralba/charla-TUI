import http from "node:http";

const port = Number(process.env.PORT || 8080);
let requestCount = 0;

function json(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  response.end(JSON.stringify(body));
}

http.createServer((request, response) => {
  requestCount += 1;
  console.log(`${new Date().toISOString()} ${request.method} ${request.url}`);

  if (request.url === "/health") return json(response, 200, { status: "ok" });
  if (request.url === "/api/message") {
    return json(response, 200, {
      message: "¡El backend responde desde Docker!",
      databaseConfigured: Boolean(process.env.DATABASE_URL),
    });
  }
  if (request.url === "/metrics") {
    response.writeHead(200, { "Content-Type": "text/plain; version=0.0.4" });
    return response.end(
      "# HELP workshop_http_requests_total Solicitudes recibidas\n" +
      "# TYPE workshop_http_requests_total counter\n" +
      `workshop_http_requests_total ${requestCount}\n`,
    );
  }
  return json(response, 404, { error: "Ruta no encontrada" });
}).listen(port, "0.0.0.0", () => console.log(`Backend listo en ${port}`));

