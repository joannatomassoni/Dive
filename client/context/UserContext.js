import React, { createContext, useState } from 'react';

export const SignedInContext = createContext({});

const [userInfo, setUserInfo] = useState({});