import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { loadGapiInsideDOM } from 'gapi-script';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/reducer/userSlice';

export default function AuthSupport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientId =
    '125118453417-gamn15d8or66e8r6gttah5ubeu95q88g.apps.googleusercontent.com';

  const userLogin = useSelector((state: any) => state.user).userLogin;

  useEffect(() => {
    (async () => {
      await loadGapiInsideDOM();
    })();
  });

  useEffect(() => {
    if (userLogin) {
      localStorage.setItem('userLogin', JSON.stringify(userLogin));
    }
  }, [userLogin]);

  const onSuccess = (res: any) => {
    dispatch(
      createUser({
        type: 'via3th',
        user: {
          ...res.profileObj,
          password: 'pikachu123',
        },
      })
    );
  };

  useEffect(() => {
    if (userLogin) {
      navigate('/home');
    }
  }, [userLogin]);

  const onFailure = (res: any) => {
    console.log('login fail', res);
  };

  const callbackFacebook = (res: any) => {
    console.log('callbackFacebook', res.profileObj);
  };

  return (
    <div>
      <div id="signInButton">
        <GoogleLogin
          clientId={clientId}
          buttonText="Tiếp tục với google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
          render={(renderProps) => (
            <button
              type="button"
              className="btn btn-light w-50"
              onClick={renderProps.onClick}
            >
              <img
                src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/8215f6659adc202403198fef903a447e/sign-in-with-google.svg"
                alt=""
                className="w-15 h-15 me-2"
              />
              Tiếp tục với google
            </button>
          )}
        />
        <FacebookLogin
          appId={process.env.REACT_APP_FACEBOOK_APP_ID ?? '960156035325994'}
          callback={callbackFacebook}
          render={(renderProps) => (
            <button
              className="btn btn-light w-50"
              onClick={renderProps.onClick}
            >
              <i className="bi bi-facebook text-primary me-2"></i>
              Tiếp tục với facebook
            </button>
          )}
        />
      </div>
    </div>
  );
}
