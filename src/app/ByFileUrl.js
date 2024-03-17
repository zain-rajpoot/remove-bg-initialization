"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useTransition } from 'react'

export default function ByFileUrl() {
    const [url, seturl] = useState('');
    const [imagePath, setimagePath] = useState(null);
    const [isPending, startTrasition] = useTransition()
    const HandleFileSubmit = (e) => {
        e.preventDefault()
        startTrasition(async () => {
            await axios.post(`/api/url`, { url: url })
                .then((res) => {
                    setimagePath(res?.data?.imagePath);
                })
                .catch((err) => {
                    alert(err?.response?.data?.error)
                });
        })
    };
    return (
        <div>
            <form className='flex w-96 flex-col gap-3 max-w-3xl' onSubmit={HandleFileSubmit}>
                <input
                    type="url"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="url of an image"
                    value={url}
                    required
                    onChange={(e) => seturl(e.target.value)}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className={`${isPending ? "opacity-70 cursor-not-allowed" : ""} flex w-full justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                    Submit
                </button>
            </form>
            <br />
            {imagePath &&
                <div className='flex flex-col gap-5'>
                    <h2 className='text-3xl'>File is deleted!</h2>
                    <div className='text-sm'>
                        Because of low hosting storage else host image some where else like{" "}
                        <Link target='_blank' href="https://appwrite.io" className='text-indigo-500 underline'>Appwrite</Link>{" "} or {" "}
                        <Link target='_blank' href="https://uploadthing.com/" className='text-indigo-500 underline'>Upload Things</Link>
                    </div>
                    <p className='text-sm'>for using it remove <b>await fs.promises.unlink(imagePath)</b> from backend </p>
                    <img src={`${location.origin}${imagePath}`}
                        className="w-96"
                        alt="bg-remove"
                    />
                </div>
            }
        </div>
    )
}
