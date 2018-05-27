/*
 * 	Copyright (c) 2017. Toshi Inc
 *
 * 	This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.crypto.util;

import org.spongycastle.util.encoders.Hex;

import java.math.BigInteger;
import java.util.Arrays;
import java.util.List;

public class Value {

    private Object value;
    private byte[] rlp;
    private byte[] sha3;

    private boolean decoded = false;

    public static Value fromRlpEncoded(byte[] data) {

        if (data != null && data.length != 0) {
            Value v = new Value();
            v.init(data);
            return v;
        }
        return null;
    }

    public Value(){
    }

    public void init(byte[] rlp){
        this.rlp = rlp;
    }

    public Value(Object obj) {

        this.decoded = true;
        if (obj == null) return;

        if (obj instanceof Value) {
            this.value = ((Value) obj).asObj();
        } else {
            this.value = obj;
        }
    }

    /* *****************
     *      Convert
     * *****************/

    public Object asObj() {
        decode();
        return value;
    }

    public List<Object> asList() {
        decode();
        Object[] valueArray = (Object[]) value;
        return Arrays.asList(valueArray);
    }

    public int asInt() {
        decode();
        if (isInt()) {
            return (Integer) value;
        } else if (isBytes()) {
            return new BigInteger(1, asBytes()).intValue();
        }
        return 0;
    }

    public long asLong() {
        decode();
        if (isLong()) {
            return (Long) value;
        } else if (isBytes()) {
            return new BigInteger(1, asBytes()).longValue();
        }
        return 0;
    }

    public BigInteger asBigInt() {
        decode();
        return (BigInteger) value;
    }

    public String asString() {
        decode();
        if (isBytes()) {
            return new String((byte[]) value);
        } else if (isString()) {
            return (String) value;
        }
        return "";
    }

    public byte[] asBytes() {
        decode();
        if (isBytes()) {
            return (byte[]) value;
        } else if (isString()) {
            return asString().getBytes();
        }
        return new byte[0];
    }

    public String getHex(){
        return Hex.toHexString(this.encode());
    }

    public byte[] getData(){
        return this.encode();
    }


    public int[] asSlice() {
        return (int[]) value;
    }

    public Value get(int index) {
        if (isList()) {
            // Guard for OutOfBounds
            if (asList().size() <= index) {
                return new Value(null);
            }
            if (index < 0) {
                throw new RuntimeException("Negative index not allowed");
            }
            return new Value(asList().get(index));
        }
        // If this wasn't a slice you probably shouldn't be using this function
        return new Value(null);
    }

    /* *****************
     *      Utility
     * *****************/

    public void decode(){
        if (!this.decoded) {
            this.value = RLP.decode(rlp, 0).getDecoded();
            this.decoded = true;
        }
    }

    public byte[] encode() {
        if (rlp == null)
            rlp = RLP.encode(value);
        return rlp;
    }

    public byte[] hash(){
        if (sha3 == null)
            sha3 = HashUtil.sha3(encode());
        return sha3;
    }

    /* *****************
     *      Checks
     * *****************/

    public boolean isList() {
        decode();
        return value != null && value.getClass().isArray() && !value.getClass().getComponentType().isPrimitive();
    }

    public boolean isString() {
        decode();
        return value instanceof String;
    }

    public boolean isInt() {
        decode();
        return value instanceof Integer;
    }

    public boolean isLong() {
        decode();
        return value instanceof Long;
    }

    public boolean isBigInt() {
        decode();
        return value instanceof BigInteger;
    }

    public boolean isBytes() {
        decode();
        return value instanceof byte[];
    }

    // it's only if the isBytes() = true;
    public boolean isReadableString() {

        decode();
        int readableChars = 0;
        byte[] data = (byte[]) value;

        if (data.length == 1 && data[0] > 31 && data[0] < 126) {
            return true;
        }

        for (byte aData : data) {
            if (aData > 32 && aData < 126) ++readableChars;
        }

        return (double) readableChars / (double) data.length > 0.55;
    }

    // it's only if the isBytes() = true;
    public boolean isHexString() {

        decode();
        int hexChars = 0;
        byte[] data = (byte[]) value;

        for (byte aData : data) {

            if ((aData >= 48 && aData <= 57)
                    || (aData >= 97 && aData <= 102))
                ++hexChars;
        }

        return (double) hexChars / (double) data.length > 0.9;
    }

    public boolean isHashCode() {
        decode();
        return this.asBytes().length == 32;
    }

    public boolean isNull() {
        decode();
        return value == null;
    }

    public boolean isEmpty() {
        decode();
        if (isNull()) return true;
        if (isBytes() && asBytes().length == 0) return true;
        if (isList() && asList().isEmpty()) return true;
        if (isString() && asString().equals("")) return true;

        return false;
    }

    public int length() {
        decode();
        if (isList()) {
            return asList().size();
        } else if (isBytes()) {
            return asBytes().length;
        } else if (isString()) {
            return asString().length();
        }
        return 0;
    }

    public int countBranchNodes() {
        decode();
        if (this.isList()) {
            List<Object> objList = this.asList();
            int i = 0;
            for (Object obj : objList) {
                i += (new Value(obj)).countBranchNodes();
            }
            return i;
        } else if (this.isBytes()) {
            this.asBytes();
        }
        return 0;
    }
}
