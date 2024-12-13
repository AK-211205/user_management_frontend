// 'use client'

// import React, { useState } from 'react'
// // import { useRouter } from 'next/navigation'
// import Link from 'next/link'
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { ArrowLeft } from 'lucide-react'
// import { showSuccessToast,showErrorToast } from '../components/ToastNotify'

// export default function ChangePasswordPage() {
//   const [currentPassword, setCurrentPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   // const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [passwordCriteria, setPasswordCriteria] = useState({
//     length: false,
//     uppercase: false,
//     lowercase: false,
//     specialChar: false,
//   })

//   // const router = useRouter()

//   const validatePassword = (password) => {
//     setPasswordCriteria({
//       length: password.length >= 8,
//       uppercase: /[A-Z]/.test(password),
//       lowercase: /[a-z]/.test(password),
//       specialChar: /[@$!%*?&#]/.test(password),
//     })
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     // setError('')
//     setLoading(true)

//     if (!Object.values(passwordCriteria).every(Boolean)) {
//       showErrorToast('Please meet all password criteria.');
//       setLoading(false)
//       return
//     }

//     try {
//       const response = await fetch('http://localhost:3002/user/change-password', {
//         method: 'PUT',
//         credentials: 'include',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ currentPassword, newPassword }),
//       })

//       const data = await response.json()

//       if (response.ok) {
//         showSuccessToast(data.message)
        
//       } else {
//         showErrorToast(data.message || 'Password change failed. Please try again.');
//       }
//     } catch (err) {
//       console.log(err);
      
     
//       showErrorToast(err);
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-background">
//       <Card className="w-[400px]">
//         <CardHeader>
//           <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Profile
//           </Link>
//           <CardTitle>Change Password</CardTitle>
//           <CardDescription>Update your account password</CardDescription>
//         </CardHeader>
//         <form onSubmit={handleSubmit}>
//           <CardContent>
//             <div className="grid w-full items-center gap-4">
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="currentPassword">Current Password</Label>
//                 <Input 
//                   id="currentPassword" 
//                   type="password"
//                   placeholder="Enter current password"
//                   value={currentPassword}
//                   onChange={(e) => setCurrentPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="newPassword">New Password</Label>
//                 <Input 
//                   id="newPassword" 
//                   type="password"
//                   placeholder="Enter new password"
//                   value={newPassword}
//                   onChange={(e) => {
//                     setNewPassword(e.target.value)
//                     validatePassword(e.target.value)
//                   }}
//                   required
//                 />
//               </div>
//               <ul className="text-sm mt-2 space-y-1">
//                 <li className={passwordCriteria.length ? 'text-green-500' : 'text-red-500'}>Password must be at least 8 characters long</li>
//                 <li className={passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}>Password must contain an uppercase letter</li>
//                 <li className={passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}>Password must contain a lowercase letter</li>
//                 <li className={passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}>Password must contain a special character (@, $, !, %, *, ?, &)</li>
//               </ul>
//             </div>
            
//           </CardContent>
//           <CardFooter className="flex flex-col">
//             <Button className="w-full" type="submit" disabled={loading}>
//               {loading ? 'Updating...' : 'Change Password'}
//             </Button>
//           </CardFooter>
//         </form>
//       </Card>
//     </div>
//   )
// }

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { showSuccessToast, showErrorToast } from '../components/ToastNotify';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode state from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeState = !darkMode;
    setDarkMode(newDarkModeState);
    localStorage.setItem('darkMode', newDarkModeState.toString());
  };

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[@$!%*?&#]/.test(password),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!Object.values(passwordCriteria).every(Boolean)) {
      showErrorToast('Please meet all password criteria.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3002/user/change-password', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        showSuccessToast(data.message);
      } else {
        showErrorToast(data.message || 'Password change failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      showErrorToast('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-[#171717] text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main className="container mx-auto p-4 max-w-md">
        <div className="mb-6">
          <Link
            href="/"
            className={`flex items-center text-sm ${
              darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </div>
        <Card
          className={`${
            darkMode
              ? 'bg-[#171717] text-white border border-gray-700'
              : 'bg-white text-black border border-gray-300'
          }`}
        >
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className={`${
                      darkMode
                        ? 'bg-[#171717] text-white border-gray-600'
                        : 'bg-white text-black border-gray-300'
                    }`}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    required
                    className={`${
                      darkMode
                        ? 'bg-[#171717] text-white border-gray-600'
                        : 'bg-white text-black border-gray-300'
                    }`}
                  />
                </div>
                <ul className="text-sm mt-2 space-y-1">
                  <li
                    className={passwordCriteria.length ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must be at least 8 characters long
                  </li>
                  <li
                    className={passwordCriteria.uppercase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain an uppercase letter
                  </li>
                  <li
                    className={passwordCriteria.lowercase ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain a lowercase letter
                  </li>
                  <li
                    className={passwordCriteria.specialChar ? 'text-green-500' : 'text-red-500'}
                  >
                    Password must contain a special character (@, $, !, %, *, ?, &)
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Change Password'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  );
}
