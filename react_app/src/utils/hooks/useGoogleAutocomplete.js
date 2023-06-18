import { useEffect } from "react";

export default function useGoogleAutocomplete(inputRef, setValue, setId) {
    useEffect(() => {
        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current
        );

        autocomplete.addListener("place_changed", async function () {
            const place = await autocomplete.getPlace();
            setValue(place.name);
            setId(place.place_id);
        });
    }, [inputRef, setValue, setId]);
}
