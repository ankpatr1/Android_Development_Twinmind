import * as AuthSession from 'expo-auth-session';
import { useAuthRequest } from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const clientId = '894988236588-s9j2hce19o7do5uf12rus1u71km6bdg8.apps.googleusercontent.com';

  const redirectUri = AuthSession.makeRedirectUri({ useProxy: true } as any);

  const [request, response, promptAsync] = useAuthRequest({
    clientId,
    redirectUri,
    scopes: ['openid', 'profile', 'email'],
  });

  const [userInfo, setUserInfo] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchUserInfo = async () => {
      if (response?.type === 'success' && response.authentication) {
        const accessToken = response.authentication.accessToken;
        console.log('✅ Access Token:', accessToken);

        try {
          const res = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          const user = await res.json();
          console.log('✅ Google User Info:', user);
          setUserInfo(user);
        } catch (err) {
          console.error('❌ Failed to fetch user info:', err);
        }
      }
    };

    fetchUserInfo();
  }, [response]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login with Google</Text>
      <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />

      {userInfo && (
        <View style={styles.profile}>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text style={styles.name}>{userInfo.name}</Text>
          <Text>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  profile: {
    marginTop: 32,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
