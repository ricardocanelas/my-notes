>> Working..

# Notes

- Gerenciar Usuarios: https://firebase.google.com/docs/auth/web/manage-users?hl=pt-br
- Regras: https://firebase.google.com/docs/database/security
          https://firebase.google.com/docs/database/security/securing-data

## Database

*Realtime Database*

Test:

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

```
// any logged in user can get a list of room names
".read": "auth !== null",




```

```
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid"
        ".write": "$uid === auth.uid"
      }
    },
    "habits": {
      "$habit": {
        ".read": "data.child('user_id').val() === auth.uid";
      }
    }
  }
}
```

*Cloud Firestore*
