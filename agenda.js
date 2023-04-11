import express from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';

const app = express();

dotenv.config();

app.listen('8001', () => {
    console.log('Server running on port 8001');
})

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

app.get('/google', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });

      console.log(authUrl);
      res.redirect(authUrl);
});


app.get('/google/redirect', async (req, res) => {
    try {
        const authCode = req.query.code;
        const { tokens } = await oauth2Client.getToken(authCode);
        console.log('Tokens recebidos:', tokens);
        oauth2Client.setCredentials(tokens);

        res.send(tokens);
      } catch (error) {
        console.error('Erro ao tentar obter tokens:', error);
      }
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

async function createEvent(event) {
    try {
      const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

app.post('/calendar/create-event', express.json(), async (req, res) => {
    try {
      const { summary, startDate, endDate } = req.body;
      const event = {
        summary: summary,
        start: {
          dateTime: startDate,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: endDate,
          timeZone: 'America/Sao_Paulo',
        },
      };
  
      const createdEvent = await createEvent(event);
      res.send(createdEvent);
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      res.status(500).send('Erro ao criar evento');
    }
  });
  