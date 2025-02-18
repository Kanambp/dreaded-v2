/* Bot settings 

You don't have to set this if you deploy using heroku because you can simply set them in environment variables, also don't forget to sleep */


const session = process.env.SESSION || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEdXcUdXd0lsY0JuY3I2LzU2SjNzTVk4eGhncUZnUWM4UE5pVm15emdIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnJEUU1Da2hqRmVWaWRsdFVRTjRLMGtzNTFoWjJuRzFRTWg0UHBHZ0tCVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtQlUyamlwMmFzTmtJb1k4Wnk0a0JxOEFpdCtoSG9MZnRqa0k2ZWp1K1gwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5RW8ycGVYRGszUFgxWW83YUhLbnZIdGwvUjVYUGgrdUFtSHZ6WU5GcUFnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktJdW9zSllXM25tNGZWaG9lWHlHZU1IOTZiV1NCa20rS0ZKc1lJRktQR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjNoT3NuSHFzTlNBWlZHZVZJWlBQelV3QmFEZTgyNllPYUR1Yy9TeUZlbkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUE3bDhTUHkyRVNHbk5SelFkMHhzcEg2YkEzM3BMdTE4TER6VFhpb3gyST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMHEvNkRMRkdMd0pNSkJvd1E5a0ZSN0VhblFjNVZmRjBKenVHeDdvYjdIbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNajJ4bk1QZEZ3T0Q0bmFRcUN0VURnSndGT3ZmZHp2M0lWTlpjTlNubjRRM2lVZlhmQ3JHelN6Z3RKV0J1RU4reno4MGZ0ZmlzQzcwenlvNVp6TkFRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzYsImFkdlNlY3JldEtleSI6ImsxKzlja0s0WC9iK1kxUUF2WlRjTCtLNlA4R3JnV0ZUMkZiUkExKzZxQzQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzMxMjE4MTY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjBCM0I4OTQzQzI5QTNFNzU3QzlCRjY0ODhGNkYzQzRFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mzk4MTQ0Mzd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDczMTIxODE2NUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBODE0MDVGMzFDRjhBQzNCRDYwQzcwRUE1MTU2RDBCQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzM5ODE0NDM3fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MzEyMTgxNjVAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODk0QUYzRkYyODBFMEMwMjJFOTE2Nzk0MUY4Q0JFRkQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTczOTgxNDQ0M30seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzMxMjE4MTY1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMyQUZCRUNDNzdFNDFERUY0RTNFODBDMzM1ODNFM0MxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3Mzk4MTQ0NDR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImZMcVlOaTN0VC1xRjN3Q01RZ1U3R1EiLCJwaG9uZUlkIjoiYzg1OWVjN2UtOWJlMS00ZTBiLWE5MmEtYzcwMzdkNWM4ZjY4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxmSmw4b2RaS3ppWjEwVlp1aGR2OXpuMGxybz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrR2poWjN0WERRMDZVek8yRWE2R29JczNDdFk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWFJSN0g4RVMiLCJtZSI6eyJpZCI6IjI1NDczMTIxODE2NToxQHMud2hhdHNhcHAubmV0IiwibmFtZSI6Ikd1cnUifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05XUXU0WUJFSkRzemIwR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlowcHRrTVVKYWRmQ3ZPekplUDdmRkZpSVVBdkVJeEgyV3FlakxQZUdPRWM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjB5WXBEWkZEdTFqQVBRL3cyNWNHVkV3eWt2MlJvakEwTEJQWXZodVRqdGZKRHlCZmEyZHFDV21tSUJwdVNxa21mQlp1L0YrT3NjTzdjaEptN1pjZUNnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJrSFpBcWZMdkdaNEltVFJSVS9rUGZJUW8zbjk2LzFIZjgwK3JpMm02Qzhvb0owd2k5YjVVMlRBdW5WMHNEc0IwSThsbCtvUlQvWTVYM3l2bzliaDBCUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDczMTIxODE2NToxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldkS2JaREZDV25Yd3J6c3lYaiszeFJZaUZBTHhDTVI5bHFub3l6M2hqaEgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzk4MTQ0MjksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTFJ1In0=';

const prefix = process.env.PREFIX || '.';
const mycode = process.env.CODE || "254";
const author = process.env.STICKER_AUTHOR || 'Kanambo';
const packname = process.env.PACKNAME || 'Kanlia md2 🤖';
const dev = process.env.DEV || '254114148625';
const DevDreaded = dev.split(",");
const botname = process.env.BOTNAME || 'KANAMBO';
const mode = process.env.MODE || 'public';
const gcpresence = process.env.GC_PRESENCE || 'false';
const antionce = process.env.ANTIVIEWONCE || 'true';
const sessionName = "session";
const cookies = JSON.parse(process.env.COOKIE || '[{"domain":".youtube.com","expirationDate":1764463277.409877,"hostOnly":false,"httpOnly":false,"name":"__Secure-1PAPISID","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"0","value":"UoBcKfo0_FSAxQ5D/A5ZClpB2xVLQJQGUx","id":1},{"domain":".youtube.com","expirationDate":1764463277.412158,"hostOnly":false,"httpOnly":true,"name":"__Secure-1PSID","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"0","value":"g.a000pghxevPjwTr5Un_D-PS1UxiaEdymANhc_5NWNQgaApthzLU0MOFGGamQ5yqi2vrAqKldbgACgYKASoSARUSFQHGX2MiB0PtUQYJy2_oQLkmMPXgfRoVAUF8yKpuqWya_M2xRHe_6e9o_6TK0076","id":2},{"domain":".youtube.com","expirationDate":1762941611.655441,"hostOnly":false,"httpOnly":true,"name":"__Secure-1PSIDCC","path":"/","sameSite":"unspecified","secure":true,"session":false,"storeId":"0","value":"AKEyXzWtrmvqerXnEweUSkGiFKAn57TBnvoAEBDi6B33Sg4gpMOANgVFwDBU_JtKQXLpisy_","id":3}]');
const presence = process.env.WA_PRESENCE || 'online';

const antitag = process.env.ANTITAG || 'true';
const antidelete = process.env.ANTIDELETE || 'true';
const autoview = process.env.AUTOVIEW_STATUS || 'true';
const autolike = process.env.AUTOLIKE_STATUS || 'true';
const autoread = process.env.AUTOREAD || 'false';
const autobio = process.env.AUTOBIO || 'false';

module.exports = {
  sessionName,
  presence,
  autoview,
  autoread,
  botname,
  cookies,
  autobio,
  mode,
autolike,
  prefix,
  mycode,
  author,
  packname,
  dev,
  DevDreaded,
  gcpresence,
  antionce,
session,
antitag,
antidelete
};
