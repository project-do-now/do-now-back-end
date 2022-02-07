import { Request } from 'express';
import { LogDTO } from 'src/dto/model.dto';

export function createLog(req: Request) {
  const log = new LogDTO();
  log.timeStamp = new Date().toISOString();
  log.method = req.method;
  log.endPoint = req.path;
  log.request = JSON.stringify({ ...req.params, ...req.query, ...req.body });

  return log;
}
