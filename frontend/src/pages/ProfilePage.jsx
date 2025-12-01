import { Flex, Separator, useBreakpointValue } from "@chakra-ui/react"
import "primeicons/primeicons.css";
import { useState, useEffect } from "react";
import { callToast } from '../components/Toast.jsx'

import { verString, verEmail, verPassword } from '../util/Statics.js'
import { userContext } from '../context/UserContext.jsx'
import { languageContext } from '../context/LanguagesContext.jsx'

import TitleSlot from "../components/slots/TitleSlot";
import Slot from "../components/slots/Slot.jsx";
import CheckCard from '../components/CheckCard.jsx'
import GradesMenu from "../components/menus/GradesMenu.jsx";
import ShareWarning from '../components/buttons/ShareWarning.jsx'
import ProfilePassive from "../components/slots/sub/ProfilePassive.jsx";
import ProfileValidReq from "../components/menus/sub/ProfileValidReq.jsx";
import PagesBase from "../components/forms/sub/PagesBase.jsx";
import PagesBaseStack from "../components/forms/sub/PagesBaseStack.jsx";

function ProfilePage() {
  const { user, stat, share, score,
    upUser, pos, compare, signUp } = userContext();
  const { language, defPack } = languageContext();

  const [use_profile_edit, set_profile_edit] = useState(false);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(null);
  const [newPass, setNewPass] = useState(null);
  const [confPass, setConfPass] = useState(null);
  const [secQues, setSecQues] = useState(user.secret);
  const [secAns, setSecAns] = useState(null);

  const [convert, setConvert] = useState(false);

  const [topic, setTopic] = useState(language?.statics?.topics ?? defPack.statics.topics);

  const signUpList = [
    {
      'category': 'New Password',
      'getValue': (thing) => setNewPass(thing),
      'type': 'password',
      'value': '',
    },
    {
      'category': 'Confirm Password',
      'getValue': (thing) => setConfPass(thing),
      'type': 'password',
      'value': '',
    },
    {
      'category': language?.statics?.user?.secret ?? defPack.statics.user.secret,
      'getValue': (thing) => setSecQues(thing),
      'type': '',
      'value': user.secret ?? '',
    },
    {
      'category': language?.statics?.user?.answer ?? defPack.statics.user.answer,
      'getValue': (thing) => setSecAns(thing),
      'type': '',
      'value': '',
    },
  ];

  const compareMenus = [
    {
      'display': 'flex',
      'title_type': useBreakpointValue({ base: 0, sm: 0, md: 0, lg: 0, xl: 1 }),
      'pi_icon': 'pi-trophy',
      'title': language?.profile?.progressTitle ?? defPack.profile.progressTitle,
      'size': useBreakpointValue({ base: 1, sm: 1, md: 1, lg: 1, xl: 0 }),
      'part': 0,
    },
    {
      'display': { base: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' },
      'title_type': 1,
      'pi_icon': '',
      'title': null,
      'size': 0,
      'part': 1,
    },
  ];

  const update = () => {
    if (user.name != name) {
      if (!name) {
        callToast('Error', 'New user name cannot be empty!', '', 'error', pos);
        return;
      }
      else if (name.length < 2) {
        callToast('Error', 'New user name minimum length is 2!', '', 'error', pos);
        return;
      }
      else if (!verString(name)) {
        callToast('Error', 'User name invalid, allowed small, capital letters, and digits\r\nExample: Dana999', '', 'error', pos);
        return;
      }
      else {
        if (!convert) {
          upUser('name', name);

          callToast('Success', 'Name changed', '', 'success', pos);
        }
      }
    }

    if ((!!user._id && stat) || !!convert) {
      if (user.email != email) {
        if (!email) {
          callToast('Error', 'New email cannot be empty!', '', 'error', pos);
          return;
        }
        else if (email.length < 9) {
          callToast('Error', 'New email minimum length is 9!', '', 'error', pos);
          return;
        }
        else if (!verEmail(email)) {
          callToast('Error', 'Email invalid, allowed small, capital letters, and digits\r\nExample: amazing@gmail.com', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('email', email);

            callToast('Success', 'Email changed', '', 'success', pos);
          }
        }
      }

      if (!!password) {
        if (!compare(password)) {
          callToast('Error', 'Current password must match!', '', 'error', pos);
          return;
        }
        else if (password.length < 4) {
          callToast('Error', 'Current password minimum length is 4!', '', 'error', pos);
          return;
        }
        else if (!verPassword(password)) {
          callToast('Error', 'Password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
          return;
        }
      }

      if (!!password || !!convert) {
        if (!newPass) {
          callToast('Error', 'New password cannot be empty!', '', 'error', pos);
          return;
        }
        else if (newPass.length < 4) {
          callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
          return;
        }
        else if (password == newPass) {
          callToast('Error', 'New password cannot match with old password!', '', 'error', pos);
          return;
        }
        else if (!verPassword(newPass)) {
          callToast('Error', 'New password invalid, allowed: small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
          return;
        }
        else {
          if (!confPass) {
            callToast('Error', 'Confirmation password cannot be empty!', '', 'error', pos);
            return;
          }
          else if (confPass.length < 4) {
            callToast('Error', 'New password minimum length is 4!', '', 'error', pos);
            return;
          }
          else if (confPass != newPass) {
            callToast('Error', 'Confirmation password must match new password!', '', 'error', pos);
            return;
          }
          else if (!verPassword(confPass)) {
            callToast('Error', 'Confirmation password invalid, allowed small, capital letters, digits and symbols\r\nExample: Dr552!@', '', 'error', pos);
            return;
          }
          else {
            if (!convert) {
              upUser(newPass);

              callToast('Success', 'Password changed', '', 'success', pos);
            }
          }
        }
      }

      if (user.secret != secQues || !!convert) {
        if (!secQues) {
          callToast('Error', 'New secret question cannot be empty!', '', 'error', pos);
          return;
        }
        else if (secQues.length < 2) {
          callToast('Error', 'New secret question minimum length is 2!', '', 'error', pos);
          return;
        }
        else if (!verString(secQues)) {
          callToast('Error', 'Secret question invalid, allowed small, capital letters, and digits\r\nExample: My age', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('secret', secQues);

            callToast('Success', 'Secret question changed.', '', 'success', pos);
          }
        }
      }

      if ((!!secAns && user.answer != secAns) || (!!convert && !!secQues)) {
        if (!secAns) {
          callToast('Error', 'New secret answer cannot be empty!', '', 'error', pos);
          return;
        }
        else if (secAns.length < 2) {
          callToast('Error', 'New secret answer minimum length is 2!', '', 'error', pos);
          return;
        }
        else if (!verString(secAns)) {
          callToast('Error', 'Secret answer invalid, allowed small, capital letters, and digits\r\nExample: 6', '', 'error', pos);
          return;
        }
        else {
          if (!convert) {
            upUser('answer', secAns);

            callToast('Success', 'Secret answer changed.', '', 'success', pos);
          }
        }
      }

      if (!!convert) signUp(false, name, email, newPass, secQues, secAns);
    }
  }

  const warningMes = () => callToast('Info:', 'Unable to share your grades! Please make online account to do so! You can check your status in profile or top left corner menu!', '', '', pos);

  useEffect(() => {
    setTopic(language?.statics?.topics ?? defPack.statics.topics);
  }, [language]);

  useEffect(() => {
    if (user.name != name) setName(user.name);
    if (user.email != email) setEmail(user.email);
    if (user.secret != secQues) setSecQues(user.secret);
  }, [user.name, user.email, user.secret]);

  useEffect(() => {
    if (!use_profile_edit) {
      setPassword(null);
      setNewPass(null);
      setConfPass(null);
      setSecAns(null);
    }
  }, [use_profile_edit]);

  return (<PagesBase gap={5} h={useBreakpointValue({ lg: 'auto', xl: '100vh' })}
    justifyContent={'center'}
    alignItems={useBreakpointValue({ base: 'center', sm: 'center', md: 'center', lg: 'top' })}
    lg={{ flexDirection: 'row' }}>

    <PagesBaseStack width={{ base: 'full', sm: '25rem' }}
      alignSelf={'top'}
      textAlign={'center'}>

      <TitleSlot pi_icon={'pi-id-card'} title={language?.profile?.profileTitle ?? defPack.profile.profileTitle} />
      <Separator />
      <Slot value={user.name ?? (language?.statics?.error?.noUser ?? defPack.statics.error.noUser)}
        category={language?.statics?.user?.name ?? defPack.statics.user.name}
        edit={use_profile_edit}
        getValue={(thing) => setName(thing)}
      />
      {
        ((stat && !!user._id) || !!convert) &&
        <Slot value={user.email ?? null}
          placeholder={'-----'}
          category={language?.statics?.user?.email ?? defPack.statics.user.email}
          edit={(use_profile_edit && stat) || !!convert ? true : false}
          getValue={(thing) => setEmail(thing)} />
      }
      {
        (use_profile_edit && stat && !!user._id) &&
        <Slot placeholder={'-----'}
          category={'Current Password'}
          edit={true}
          getValue={(thing) => setPassword(thing)}
          type="password" />
      }

      {
        ((use_profile_edit && stat && !!user._id) || !!convert) &&
        signUpList.map((thing, ind) => {
          return (<Slot key={'s-u' + ind}
            placeholder={'-----'}
            category={thing.category}
            edit={true}
            getValue={thing.getValue}
            type={thing.type}
            value={thing.value}
          />)
        })
      }
      <ProfilePassive type={'status'} />
      <ProfilePassive type={'shared'} />
      <Separator />
      <Flex gapY={3} flexDirection={"column"} textAlign={'center'}>
        {
          //< MENU throws out a toast!!!! as status is local
        }
        <CheckCard pi_icon={'pi-thumbtack'}
          title={language?.profile?.edit ?? defPack.profile.edit}
          disabled={user._id != null ? false : true}
          ifChange={() => {
            set_profile_edit(!use_profile_edit);

            if (use_profile_edit) update();
          }} />
        {
          !!user._id ? (
            !share ? (<ProfileValidReq type='share' />) :
              (<ProfileValidReq type='remove' />)
          ) : (<ShareWarning warningMes={warningMes} user={user} value={language?.profile?.share ?? defPack.profile.share} />)
        }
        {
          user._id === 0 ? (<ProfileValidReq type='convert' update={() => update()} convert={(val) => setConvert(val)} />) : (
            !!user._id && (<ProfileValidReq type='delete' />)
          )
        }

      </Flex>

    </PagesBaseStack>
    {
      compareMenus.map((thing, ind) => {
        return (<GradesMenu key={'gm' + ind}
          display={thing.display}
          title_type={thing.title_type}
          pi_icon={thing.pi_icon}
          title={thing.title}
          title_info={{
            info_a: {
              pi_icon: 'pi-trophy',
              title: language?.profile?.progressTitle ?? defPack.profile.progressTitle
            },
            info_b: {
              pi_icon: 'pi-hashtag',
              title: language?.profile?.elementarySchool ?? defPack.profile.elementarySchool
            }
          }}
          topic_names={topic}
          fst_scores={score}
          size={thing.size}
          part={thing.part}
        />)
      })
    }

  </PagesBase>)
}

export default ProfilePage